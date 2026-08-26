import "server-only";

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const ALERT_SENDER = "FestFuse Alerts <onboarding@resend.dev>";

// Minimal failure notification, decided in ADR-0009. Fire-and-forget: a failed send
// must never throw into or block the caller's own fallback path.
export function sendFailureAlert(subject: string, message: string): void {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.FESTFUSE_ALERT_EMAIL_TO;
  if (!apiKey || !to) return;

  fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: ALERT_SENDER,
      to,
      subject,
      text: message,
    }),
  })
    .then(async (response) => {
      if (!response.ok) {
        console.error(
          `Failure alert email rejected by Resend: ${response.status} ${await response.text()}`
        );
      }
    })
    .catch((error) => {
      console.error("Failed to send failure alert email", error);
    });
}
