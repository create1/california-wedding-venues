// Self-service: no human reply. We only send automated transactional emails.
// If RESEND_API_KEY is set, send via Resend; otherwise log to console (dev).

type LeadEmailPayload = {
  venueName: string;
  venueEmail?: string;
  coupleName: string;
  coupleEmail: string;
  couplePhone?: string;
  weddingDate?: string;
  guestCount?: string;
  message?: string;
};

export async function sendLeadEmail(p: LeadEmailPayload): Promise<void> {
  const from = process.env.FROM_EMAIL ?? "noreply@example.com";
  const to = p.venueEmail ?? "venue@example.com"; // In production, venue must have contactEmail
  const subject = `New inquiry from ${p.coupleName} – California Wedding Venues`;
  const text = [
    `You received a new inquiry from California Wedding Venues.`,
    ``,
    `From: ${p.coupleName} <${p.coupleEmail}>`,
    p.couplePhone ? `Phone: ${p.couplePhone}` : null,
    p.weddingDate ? `Wedding date: ${p.weddingDate}` : null,
    p.guestCount ? `Guest count: ${p.guestCount}` : null,
    ``,
    p.message ? `Message:\n${p.message}` : `(No message provided)`,
    ``,
    `Reply directly to ${p.coupleEmail} to respond.`,
    ``,
    `— California Wedding Venues (this is an automated message)`,
  ]
    .filter(Boolean)
    .join("\n");

  if (process.env.RESEND_API_KEY) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({ from, to, subject, text }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error("Resend error:", res.status, err);
    }
  } else {
    console.log("[Email (no RESEND_API_KEY)]", { to, subject, text: text.slice(0, 200) + "…" });
  }
}

export async function sendVenueApplicationReceived(email: string, venueName: string): Promise<void> {
  const from = process.env.FROM_EMAIL ?? "noreply@example.com";
  const subject = "We received your venue application – California Wedding Venues";
  const text = [
    `Hi,`,
    ``,
    `We received your application for "${venueName}". We'll review it within 48 hours and email you once your listing is approved or if we need any changes.`,
    ``,
    `You can log in anytime at the link below to check your application status and edit your profile.`,
    ``,
    `Venue dashboard: ${process.env.NEXTAUTH_URL ?? "https://californiaweddingvenues.xyz"}/venue/dashboard`,
    ``,
    `— California Wedding Venues (automated message)`,
  ].join("\n");

  if (process.env.RESEND_API_KEY) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({ from, to: email, subject, text }),
    });
  } else {
    console.log("[Email] Application received", { to: email, subject });
  }
}

export async function sendVenueApproved(email: string, venueName: string): Promise<void> {
  const base = process.env.NEXTAUTH_URL ?? "https://californiaweddingvenues.xyz";
  const subject = "Your venue is live – California Wedding Venues";
  const text = [
    `Hi,`,
    ``,
    `Great news: "${venueName}" is now approved and live on California Wedding Venues. Couples can find and contact you.`,
    ``,
    `Next steps:`,
    `• Log in and complete your profile (photos, description) to get more leads.`,
    `• Upgrade your plan anytime for more visibility and leads.`,
    ``,
    `Dashboard: ${base}/venue/dashboard`,
    `Help: ${base}/help`,
    ``,
    `— California Wedding Venues (automated message)`,
  ].join("\n");

  if (process.env.RESEND_API_KEY) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: process.env.FROM_EMAIL ?? "noreply@example.com",
        to: email,
        subject,
        text,
      }),
    });
  } else {
    console.log("[Email] Venue approved", { to: email, subject });
  }
}

export async function sendVenueRejected(email: string, venueName: string, reason?: string): Promise<void> {
  const subject = "Update on your venue application – California Wedding Venues";
  const text = [
    `Hi,`,
    ``,
    `We've reviewed your application for "${venueName}". At this time we're unable to approve it.`,
    reason ? `Reason: ${reason}` : null,
    ``,
    `You can update your listing and re-submit from your dashboard, or contact us with questions.`,
    ``,
    `— California Wedding Venues (automated message)`,
  ]
    .filter(Boolean)
    .join("\n");

  if (process.env.RESEND_API_KEY) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: process.env.FROM_EMAIL ?? "noreply@example.com",
        to: email,
        subject,
        text,
      }),
    });
  } else {
    console.log("[Email] Venue rejected", { to: email, subject });
  }
}
