import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-3xl font-semibold text-stone-800">Privacy policy</h1>
      <p className="mt-4 text-stone-600">
        We collect only what’s needed to run the service: account and venue data for listings, and inquiry details (name, email, message) so venues can reply to couples. We don’t sell your data. We use Stripe for payments (see Stripe’s privacy policy). We may send transactional email (e.g. approval, leads). No customer support means we don’t retain chat or ticket history.
      </p>
      <p className="mt-4 text-stone-600">
        For California residents: we don’t sell personal information. You can request access or deletion of your data by contacting us (see Help → Contact). We do not offer a separate support channel; use the same contact method listed there for data requests.
      </p>
      <p className="mt-6 text-sm text-stone-500">
        <Link href="/" className="text-sage-600 hover:underline">Back to home</Link>
      </p>
    </div>
  );
}
