import { NextResponse } from "next/server";
import { verifyCaptcha } from "../../../lib/captcha";
import { fieldsTable, fieldsText, getMailConfig, sendMail } from "../../../lib/email";
import { EMAIL_PATTERN, line, multiline } from "../../../lib/form-fields";
import { clientIp, isRateLimited } from "../../../lib/rate-limit";

export const runtime = "nodejs";

const fail = (error: string, status = 400) => NextResponse.json({ error }, { status });

/** Website contact form: emails the enquiry to the Info team and acknowledges the sender. */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail("Invalid request.");
  }

  // Hidden honeypot field: real visitors never fill it in.
  if (line(body.website)) return NextResponse.json({ success: true });

  const ip = clientIp(request);

  const name = line(body.name);
  const email = line(body.email);
  const company = line(body.company);
  const phone = line(body.phone, 40);
  const service = line(body.service);
  const message = multiline(body.message);

  if (!name || !email || !company || !message) return fail("Please add your name, email, company, and message before submitting.");
  if (!EMAIL_PATTERN.test(email)) return fail("Please enter a valid email address.");
  if (!(await verifyCaptcha(body.captchaToken, ip))) return fail("Please complete the security check and try again.");
  if (isRateLimited(`contact:${ip}`)) return fail("Too many requests. Please try again in a few minutes.", 429);

  const fields: [string, string][] = [["Name", name], ["Email", email], ["Company", company], ["Phone", phone], ["Service of Interest", service], ["Message", message]];

  try {
    const { contactTo } = getMailConfig();
    await Promise.all([
      sendMail("YantranshVT Website", {
        to: contactTo,
        replyTo: email,
        subject: `Website Contact Inquiry - ${name}`,
        text: `New enquiry from the website contact form.\n\n${fieldsText(fields)}`,
        html: `<p style="font-family:Arial,sans-serif">New enquiry from the website contact form.</p>${fieldsTable(fields)}`,
      }),
      sendMail("YantranshVT", {
        to: email,
        replyTo: contactTo,
        subject: "Thank you for contacting YantranshVT",
        text: `Hello ${name},\n\nThank you for reaching out to YantranshVT. Our team has received your message and will get back to you shortly.\n\nRegards,\nYantranshVT`,
      }),
    ]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending contact email:", error);
    return fail("We couldn't send your message right now. Please try again or email Info@yantranshVT.com.", 500);
  }
}
