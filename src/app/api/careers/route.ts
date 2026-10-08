import { NextResponse } from "next/server";
import { verifyCaptcha } from "../../../lib/captcha";
import { fieldsTable, fieldsText, getMailConfig, sendMail } from "../../../lib/email";
import { EMAIL_PATTERN, line, multiline } from "../../../lib/form-fields";
import { clientIp, isRateLimited } from "../../../lib/rate-limit";

export const runtime = "nodejs";

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const RESUME_TYPES: Record<string, { mime: string; magic: number[] }> = {
  pdf: { mime: "application/pdf", magic: [0x25, 0x50, 0x44, 0x46] },
  doc: { mime: "application/msword", magic: [0xd0, 0xcf, 0x11, 0xe0] },
  docx: { mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", magic: [0x50, 0x4b, 0x03, 0x04] },
};

const fail = (error: string, status = 400) => NextResponse.json({ error }, { status });

/** Careers form: emails the application, with the optional resume attached, to HR. */
export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail("Invalid request.");
  }

  if (line(form.get("website"))) return NextResponse.json({ success: true });

  const ip = clientIp(request);

  const name = line(form.get("name"));
  const email = line(form.get("email"));
  const phone = line(form.get("phone"), 40);
  const role = line(form.get("role"));
  const experience = line(form.get("experience"));
  const profile = line(form.get("profile"), 500);
  const message = multiline(form.get("message"));

  if (!name || !email || !role) return fail("Please add your name, email, and role of interest before submitting.");
  if (!EMAIL_PATTERN.test(email)) return fail("Please enter a valid email address.");
  if (profile && !/^https?:\/\/\S+$/i.test(profile)) return fail("Please enter a full profile link starting with https://.");

  let attachment: { filename: string; content: Buffer; contentType: string } | undefined;
  const resume = form.get("resume");
  if (resume instanceof File && resume.size > 0) {
    const ext = resume.name.split(".").pop()?.toLowerCase() || "";
    const type = RESUME_TYPES[ext];
    if (!type) return fail("Please upload your resume as a PDF, DOC or DOCX file.");
    if (resume.size > MAX_RESUME_BYTES) return fail("Your resume must be 5 MB or smaller.");
    const content = Buffer.from(await resume.arrayBuffer());
    if (!type.magic.every((byte, i) => content[i] === byte)) return fail("Please upload your resume as a PDF, DOC or DOCX file.");
    const safeName = `${name.replace(/[^\w.-]+/g, "_").slice(0, 60) || "Resume"}_Resume.${ext}`;
    attachment = { filename: safeName, content, contentType: type.mime };
  }

  if (!(await verifyCaptcha(form.get("captchaToken"), ip))) return fail("Please complete the security check and try again.");
  if (isRateLimited(`careers:${ip}`)) return fail("Too many requests. Please try again in a few minutes.", 429);

  const fields: [string, string][] = [["Name", name], ["Email", email], ["Phone", phone], ["Role of Interest", role], ["Experience", experience], ["Resume / LinkedIn URL", profile], ["Resume attached", attachment ? attachment.filename : "No"], ["Message", message]];

  try {
    const { careersTo } = getMailConfig();
    await Promise.all([
      sendMail("YantranshVT Careers", {
        to: careersTo,
        replyTo: email,
        subject: `Career Application - ${role} - ${name}`,
        text: `New application from the website careers form.\n\n${fieldsText(fields)}`,
        html: `<p style="font-family:Arial,sans-serif">New application from the website careers form.</p>${fieldsTable(fields)}`,
        attachments: attachment ? [attachment] : [],
      }),
      sendMail("YantranshVT Careers", {
        to: email,
        replyTo: careersTo,
        subject: "We've received your application",
        text: `Hello ${name},\n\nThank you for your interest in the ${role} role at YantranshVT. Our HR team has received your application and will be in touch if your profile matches our requirements.\n\nRegards,\nYantranshVT HR Team`,
      }),
    ]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending careers email:", error);
    return fail("We couldn't send your application right now. Please try again or email HR@yantranshVT.com.", 500);
  }
}
