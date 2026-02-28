"use client";

import { useState } from "react";

export function BillingPortalButton() {
  const [loading, setLoading] = useState(false);

  async function openPortal() {
    setLoading(true);
    try {
      const res = await fetch("/api/venue/billing-portal", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("Could not open billing portal. Add a payment method first by upgrading a plan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button type="button" onClick={openPortal} disabled={loading} className="btn-secondary">
      {loading ? "Opening…" : "Manage billing (update card, invoices, cancel)"}
    </button>
  );
}
