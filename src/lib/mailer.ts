import "server-only";
import { escapeHtml, getMailConfig, sendMail } from "./email";

/* VoiceIQ demo-request emails: a confirmation to the requester and a lead alert to the team. */

export interface DemoRequest {
  name: string;
  email: string;
  company: string;
  phone: string;
  callVolume: string;
}

function confirmationHtml(request: DemoRequest, subject: string, fromEmail: string) {
  const r = Object.fromEntries(Object.entries(request).map(([k, v]) => [k, escapeHtml(v)])) as unknown as DemoRequest;
  const row = (label: string, value: string, strong = false) => `
            <tr>
              <td style="padding: 6px 0; color: #64748B; width: 40%; font-weight: 500;">${label}</td>
              <td style="padding: 6px 0; color: ${strong ? "#0D47A1" : "#1E293B"}; font-weight: ${strong ? 700 : 600};">${value}</td>
            </tr>`;

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin: 0; padding: 24px 12px; background-color: #F4F6FA; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1E293B; line-height: 1.6;">
  <div style="max-width: 580px; margin: 0 auto; background: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #E2E8F0; box-shadow: 0 4px 16px rgba(13, 71, 161, 0.06);">
    <div style="background: #0D47A1; padding: 24px 32px;">
      <h2 style="margin: 0; color: #FFFFFF; font-size: 22px; font-weight: 700; letter-spacing: -0.01em;"><span style="color: #2196F3;">Voice</span> IQ</h2>
    </div>
    <div style="padding: 32px;">
      <p style="font-size: 16px; margin: 0 0 16px;">Hi <strong>${r.name}</strong>,</p>
      <p style="font-size: 16px; margin: 0 0 24px; color: #1E293B;">
        Thanks for your interest in <strong>VoiceIQ</strong>! We've received your demo request and a member of our team will get back to you within one business day.
      </p>
      <div style="background: #F4F6FA; border: 1px solid #E2E8F0; border-radius: 8px; padding: 20px; margin: 0 0 24px;">
        <p style="margin: 0 0 12px; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #0D47A1;">Here's what you submitted:</p>
        <table style="width: 100%; border-collapse: collapse; font-size: 15px;">${row("Name:", r.name)}${row("Email:", r.email)}${row("Company:", r.company)}${row("Phone:", r.phone)}${row("Monthly call volume:", r.callVolume, true)}
        </table>
      </div>
      <p style="font-size: 15px; color: #64748B; margin: 0 0 24px;">If anything above is incorrect, just reply to this email and we'll fix it.</p>
      <div style="border-top: 1px solid #E2E8F0; padding-top: 20px; font-size: 14.5px; color: #1E293B;">
        <p style="margin: 0 0 4px; font-weight: 600;">Talk soon,</p>
        <p style="margin: 0 0 8px; color: #0D47A1; font-weight: 700;">The VoiceIQ Team</p>
        <p style="margin: 0; font-size: 13.5px; color: #64748B;"><a href="mailto:${escapeHtml(fromEmail)}" style="color: #0D47A1; text-decoration: none;">${escapeHtml(fromEmail)}</a></p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

export async function sendDemoEmails(request: DemoRequest) {
  const config = getMailConfig();
  const fromName = process.env.SMTP_FROM_NAME || "VoiceIQ";
  const { name, email, company, phone, callVolume } = request;
  const userSubject = `We've received your demo request, ${name}`;
  const userText = `Hi ${name},

Thanks for your interest in VoiceIQ! We've received your demo request and a member of our team will get back to you within one business day.

Here's what you submitted:
Name: ${name}
Company: ${company}
Phone: ${phone}
Monthly call volume: ${callVolume}

If anything above is incorrect, just reply to this email and we'll fix it.

Talk soon,
The VoiceIQ Team
${config.fromEmail}`;

  const adminText = `A new demo request has been submitted on VoiceIQ!

Details:
- Name: ${name}
- Work Email: ${email}
- Company: ${company}
- Phone: ${phone}
- Monthly Call Volume: ${callVolume}
- Submitted At: ${new Date().toISOString()}`;

  await Promise.all([
    sendMail(fromName, {
      to: email,
      replyTo: config.fromEmail,
      subject: userSubject,
      text: userText,
      html: confirmationHtml(request, userSubject, config.fromEmail),
    }),
    sendMail(`${fromName} Notifications`, {
      to: config.voiceiqTo,
      replyTo: email,
      subject: `[New Demo Lead] ${name} from ${company}`,
      text: adminText,
    }),
  ]);
}
