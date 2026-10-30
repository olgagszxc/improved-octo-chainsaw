/**
 * Emails the gym when a form is submitted, through Resend's free tier.
 *
 * Needs two settings on the host:
 *   RESEND_API_KEY  a Cloudflare *secret* (never commit it)
 *   ALERT_EMAIL     where alerts go; without a verified domain on Resend this
 *                   must be the email address the Resend account was created with
 *
 * If either is missing the alert is skipped. A failed alert is only logged:
 * the submission is already saved, so the visitor still sees success.
 */

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function sendAlert(
  subject: string,
  fields: [label: string, value: string | null | undefined][],
  replyTo?: string,
): Promise<void> {
  const apiKey = process.env["RESEND_API_KEY"]?.trim();
  const to = process.env["ALERT_EMAIL"]?.trim();
  if (!apiKey || !to) return;

  const rows = fields
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#666;vertical-align:top">${escapeHtml(label)}</td><td style="padding:4px 0">${escapeHtml(value!).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Kaizen Fitness Website <onboarding@resend.dev>",
        to: [to],
        subject,
        reply_to: replyTo,
        html: `<h2 style="font-family:sans-serif">${escapeHtml(subject)}</h2><table style="font-family:sans-serif;font-size:14px">${rows}</table>`,
      }),
    });
    if (!res.ok) {
      console.error("Email alert failed:", res.status, await res.text());
    }
  } catch (err) {
    console.error("Email alert could not be sent:", err);
  }
}
