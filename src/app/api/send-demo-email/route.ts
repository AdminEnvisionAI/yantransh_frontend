import { NextResponse } from "next/server";
import { verifyCaptcha } from "../../../lib/captcha";
import { EMAIL_PATTERN, isPhone, line as text } from "../../../lib/form-fields";
import { sendDemoEmails } from "../../../lib/mailer";
import { clientIp, isRateLimited } from "../../../lib/rate-limit";

export const runtime = "nodejs";

const CALL_VOLUMES = new Set(["Under 5,000 minutes", "5,000 – 15,000 minutes", "15,000 – 1,00,000 minutes", "Over 1,00,000 minutes"]);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Hidden honeypot field: real visitors never fill it in.
  if (text(body.website)) return NextResponse.json({ success: true });

  const ip = clientIp(request);

  const name = text(body.name);
  const email = text(body.email);
  const company = text(body.company);
  const phone = text(body.phone);
  const volume = text(body.volume);

  if (!name) return NextResponse.json({ error: "Please provide a valid name." }, { status: 400 });
  if (!EMAIL_PATTERN.test(email)) return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
  if (!company) return NextResponse.json({ error: "Please provide your company name." }, { status: 400 });
  if (!isPhone(phone)) return NextResponse.json({ error: "Please provide a valid phone number." }, { status: 400 });

  if (!(await verifyCaptcha(body.captchaToken, ip))) return NextResponse.json({ error: "Please complete the security check and try again." }, { status: 400 });
  if (isRateLimited(`demo:${ip}`)) return NextResponse.json({ error: "Too many requests. Please try again in a few minutes." }, { status: 429 });

  try {
    await sendDemoEmails({ name, email, company, phone, callVolume: CALL_VOLUMES.has(volume) ? volume : "Under 5,000 minutes" });
    return NextResponse.json({ success: true, message: "Demo request received and confirmation email sent successfully." });
  } catch (error) {
    console.error("Error sending demo email:", error);
    return NextResponse.json({ error: "Unable to process demo request at this moment. Please try again." }, { status: 500 });
  }
}
