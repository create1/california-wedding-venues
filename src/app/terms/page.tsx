import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-3xl font-semibold text-stone-800">Terms of use</h1>
      <p className="mt-4 text-stone-600">
        By using California Wedding Venues you agree to use the site for lawful purposes only. Venues are responsible for the accuracy of their listings and for replying to couples. We reserve the right to suspend or remove listings that violate our guidelines. Subscription fees are billed via Stripe; refunds follow Stripe’s and our refund policy. We provide the platform as-is; there is no customer support team. Cancellation is self-serve through the billing portal.
      </p>
      <p className="mt-6 text-sm text-stone-500">
        <Link href="/" className="text-sage-600 hover:underline">Back to home</Link>
      </p>
    </div>
  );
}
