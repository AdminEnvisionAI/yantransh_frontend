import "server-only";

const MAX_FIELD = 200;
const MAX_MESSAGE = 5000;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Trims a single-line field, strips line breaks (prevents header injection) and caps its length. */
export const line = (value: unknown, max = MAX_FIELD) =>
  typeof value === "string" ? value.replace(/[\r\n]+/g, " ").trim().slice(0, max) : "";

/** Trims a multi-line field and caps its length. */
export const multiline = (value: unknown, max = MAX_MESSAGE) =>
  typeof value === "string" ? value.replace(/\r\n/g, "\n").trim().slice(0, max) : "";

export const isPhone = (value: string) => value.replace(/\D/g, "").length >= 6;
