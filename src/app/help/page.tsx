import Link from "next/link";

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-display text-3xl font-semibold text-stone-800">Help center</h1>
      <p className="mt-2 text-stone-600">
        Everything is self-serve. There is no customer support team—use the guides below and manage your account from your dashboard.
      </p>

      <nav className="mt-8 border-b border-stone-200 pb-6">
        <h2 className="font-display text-lg font-semibold text-stone-800">Contents</h2>
        <ul className="mt-2 space-y-1 text-sage-600">
          <li><a href="#for-couples" className="hover:underline">For couples</a></li>
          <li><a href="#for-venues" className="hover:underline">For venues</a></li>
          <li><a href="#faq" className="hover:underline">FAQ</a></li>
          <li><a href="#contact" className="hover:underline">Contact</a></li>
        </ul>
      </nav>

      <section id="for-couples" className="mt-10">
        <h2 className="font-display text-xl font-semibold text-stone-800">For couples</h2>
        <ul className="mt-4 space-y-4 text-stone-600">
          <li>
            <strong className="text-stone-800">How do I search?</strong>
            <br />
            Use the search on the homepage or go to Browse Venues. Filter by region, style, guest count, and budget. Click a venue to see its profile and contact form.
          </li>
          <li>
            <strong className="text-stone-800">Is it free?</strong>
            <br />
            Yes. Browsing and contacting venues is free. We never charge couples.
          </li>
          <li>
            <strong className="text-stone-800">Who receives my message?</strong>
            <br />
            Your message goes directly to the venue (by email). Reply to the venue’s response in your own inbox. We don’t sell or share your data.
          </li>
        </ul>
      </section>

      <section id="for-venues" className="mt-12">
        <h2 className="font-display text-xl font-semibold text-stone-800">For venues</h2>
        <ul className="mt-4 space-y-4 text-stone-600">
          <li>
            <strong className="text-stone-800">How do I list my venue?</strong>
            <br />
            Click “List your venue” and create an account. Fill in your venue details and upload at least 8 photos. Submit for review. We aim to approve within 48 hours.
          </li>
          <li id="approval">
            <strong className="text-stone-800">How does approval work?</strong>
            <br />
            We review each application to keep the directory quality high. You’ll get an email when your listing is approved or if we need changes. You can edit your profile anytime from your dashboard—all changes are managed by you.
          </li>
          <li>
            <strong className="text-stone-800">Who manages my listing?</strong>
            <br />
            You do. Your dashboard lets you edit your profile (photos, description, pricing, contact info), view inquiries, and manage billing. We don’t edit your listing for you.
          </li>
          <li>
            <strong className="text-stone-800">How do I get more leads?</strong>
            <br />
            Upgrade your plan (Basic, Standard, or Premium) for more included leads per month, more photos/videos, and featured placement. You can also buy lead packs if you hit your monthly limit. Manage everything under Billing in your dashboard.
          </li>
          <li>
            <strong className="text-stone-800">How do I cancel?</strong>
            <br />
            Go to Dashboard → Billing → “Manage billing.” In the Stripe portal you can cancel your subscription. You keep access until the end of your billing period. No phone call required.
          </li>
        </ul>
      </section>

      <section id="faq" className="mt-12">
        <h2 className="font-display text-xl font-semibold text-stone-800">FAQ</h2>
        <ul className="mt-4 space-y-4 text-stone-600">
          <li>
            <strong className="text-stone-800">Do you sell fake leads?</strong>
            <br />
            No. Every inquiry is from a real couple who submitted the contact form on your venue page.
          </li>
          <li>
            <strong className="text-stone-800">Is there a long-term contract?</strong>
            <br />
            No. All plans are month-to-month. Cancel anytime with 30 days’ notice (or immediately in the portal; access continues until period end).
          </li>
          <li>
            <strong className="text-stone-800">I didn’t get the approval email.</strong>
            <br />
            Check spam. Log in to your dashboard—if your venue status is “Live,” you’re approved. If it’s still “Under review,” we haven’t finished yet.
          </li>
          <li>
            <strong className="text-stone-800">I need to update my payment method.</strong>
            <br />
            Dashboard → Billing → “Manage billing.” Update your card in the Stripe portal. No support ticket needed.
          </li>
        </ul>
      </section>

      <section id="contact" className="mt-12 rounded-lg border border-stone-200 bg-stone-50 p-6">
        <h2 className="font-display text-xl font-semibold text-stone-800">Contact</h2>
        <p className="mt-2 text-stone-600">
          We do not offer phone or email support. All account and billing actions are done by you in your dashboard and the billing portal. If you have a question, check the FAQ and guides above first.
        </p>
      </section>

      <p className="mt-10 text-sm text-stone-500">
        <Link href="/" className="text-sage-600 hover:underline">Back to home</Link>
      </p>
    </div>
  );
}
