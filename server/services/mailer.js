import nodemailer from 'nodemailer';

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;
  const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD } = process.env;
  if (!EMAIL_HOST || !EMAIL_USER || !EMAIL_PASSWORD) return null;

  transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT) || 587,
    secure: Number(EMAIL_PORT) === 465,
    auth: { user: EMAIL_USER, pass: EMAIL_PASSWORD },
  });
  return transporter;
}

const escapeHtml = (value = '') =>
  value.replace(/[&<>"']/g, (char) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char])
  );

/**
 * Sends a notification for a new contact message.
 * Returns false (without throwing) when mail is not configured, so the
 * message is still stored and the visitor still gets a success response.
 */
export async function sendContactNotification({ name, email, subject, message }) {
  const mailer = getTransporter();
  if (!mailer) {
    console.warn('Email is not configured — message stored without notification.');
    return false;
  }

  await mailer.sendMail({
    from: `"Portfolio contact form" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO || process.env.EMAIL_USER,
    replyTo: email,
    subject: `Portfolio: ${subject}`,
    text: `${name} <${email}>\n\n${message}`,
    html: `
      <div style="font-family:system-ui,sans-serif;line-height:1.6">
        <h2 style="margin:0 0 4px">${escapeHtml(subject)}</h2>
        <p style="margin:0 0 16px;color:#666">
          From ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;
        </p>
        <div style="white-space:pre-wrap">${escapeHtml(message)}</div>
      </div>`,
  });

  return true;
}
