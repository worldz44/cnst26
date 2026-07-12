import nodemailer from "nodemailer";

/**
 * Gmail SMTP transport.
 *
 * Requires two environment variables (see .env.example / README):
 *   GMAIL_USER          — the conference Gmail address that sends & receives mail
 *   GMAIL_APP_PASSWORD  — a 16-character Gmail "App Password" (NOT the login password)
 *
 * Gmail App Passwords require 2-Step Verification to be enabled on the account.
 * See README.md → "Configuring Gmail App Passwords" for step-by-step setup.
 */
export function getMailTransport() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error(
      "Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variables. See .env.example."
    );
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export function getConferenceInboxAddress(): string {
  return process.env.GMAIL_USER || "";
}
