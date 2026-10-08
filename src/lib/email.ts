import "server-only";
import nodemailer, { type SendMailOptions, type Transporter } from "nodemailer";

/*
 * Shared SMTP transport for every form on the site. Configuration comes from
 * the environment (see .env.example); Next.js loads .env files automatically.
 */

export const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch] as string);

export function getMailConfig() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!user || !pass) {
    throw new Error("SMTP is not configured. Set SMTP_USER and SMTP_PASS (see .env.example).");
  }

  const port = Number.parseInt(process.env.SMTP_PORT || "465", 10);
  const fromEmail = process.env.SMTP_FROM_EMAIL || user;

  return {
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    user,
    pass,
    fromEmail,
    contactTo: process.env.CONTACT_EMAIL_TO || "Info@yantranshVT.com",
    careersTo: process.env.CAREERS_EMAIL_TO || "HR@yantranshVT.com",
    voiceiqTo: process.env.ADMIN_EMAIL || process.env.CONTACT_EMAIL_TO || "Info@yantranshVT.com",
  };
}

let transporter: Transporter | undefined;

export async function sendMail(fromName: string, options: Omit<SendMailOptions, "from">) {
  const config = getMailConfig();
  transporter ??= nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: { user: config.user, pass: config.pass },
  });
  return transporter.sendMail({ from: `"${fromName.replace(/"/g, "")}" <${config.fromEmail}>`, ...options });
}

/** Renders label/value pairs as a simple, escaped HTML table for notification emails. */
export function fieldsTable(fields: [string, string][]) {
  const rows = fields
    .filter(([, value]) => value)
    .map(([label, value]) => `<tr><td style="padding:6px 12px 6px 0;color:#64748B;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td><td style="padding:6px 0;color:#1E293B;white-space:pre-line">${escapeHtml(value)}</td></tr>`)
    .join("");
  return `<table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows}</table>`;
}

export const fieldsText = (fields: [string, string][]) =>
  fields.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`).join("\n");
