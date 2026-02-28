"use client";

import { useState } from "react";

export function InquiryForm({ venueId, venueName }: { venueId: string; venueName: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const body = {
      venueId,
      coupleName: (form.elements.namedItem("coupleName") as HTMLInputElement).value,
      coupleEmail: (form.elements.namedItem("coupleEmail") as HTMLInputElement).value,
      couplePhone: (form.elements.namedItem("couplePhone") as HTMLInputElement).value,
      weddingDate: (form.elements.namedItem("weddingDate") as HTMLInputElement).value,
      guestCount: (form.elements.namedItem("guestCount") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    const res = await fetch("/api/inquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (res.ok) {
      setStatus("sent");
      form.reset();
    } else {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="mt-4 rounded-lg bg-sage-50 p-4 text-center text-sage-800">
        <p className="font-medium">Message sent!</p>
        <p className="mt-1 text-sm">The venue will contact you at the email you provided.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mt-4 space-y-3">
      <div>
        <label htmlFor="coupleName" className="label">Your name</label>
        <input id="coupleName" name="coupleName" type="text" required className="input mt-1" placeholder="Jane & John" />
      </div>
      <div>
        <label htmlFor="coupleEmail" className="label">Email</label>
        <input id="coupleEmail" name="coupleEmail" type="email" required className="input mt-1" placeholder="you@example.com" />
      </div>
      <div>
        <label htmlFor="couplePhone" className="label">Phone (optional)</label>
        <input id="couplePhone" name="couplePhone" type="tel" className="input mt-1" placeholder="(555) 000-0000" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="weddingDate" className="label">Wedding date (optional)</label>
          <input id="weddingDate" name="weddingDate" type="text" className="input mt-1" placeholder="e.g. Fall 2026" />
        </div>
        <div>
          <label htmlFor="guestCount" className="label">Guest count (optional)</label>
          <input id="guestCount" name="guestCount" type="text" className="input mt-1" placeholder="e.g. 100" />
        </div>
      </div>
      <div>
        <label htmlFor="message" className="label">Message</label>
        <textarea id="message" name="message" rows={4} className="input mt-1" placeholder="Tell the venue a bit about your wedding..." />
      </div>
      {status === "error" && (
        <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
      )}
      <button type="submit" disabled={status === "sending"} className="btn-primary w-full">
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
