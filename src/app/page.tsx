import Link from "next/link";
import { VenueSearchForm } from "@/components/VenueSearchForm";

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-sage-50 to-stone-50 py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-sage-900 md:text-5xl">
            Find your perfect California wedding venue
          </h1>
          <p className="mt-4 text-lg text-stone-600">
            Search thousands of venues by region, style, budget, and guest count. Compare side-by-side and contact venues directly—no paywall, no fake leads.
          </p>
          <div className="mt-8">
            <VenueSearchForm />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="font-display text-2xl font-semibold text-stone-800">Browse by region</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {[
            { slug: "bay-area", name: "Bay Area" },
            { slug: "los-angeles", name: "Los Angeles" },
            { slug: "san-diego", name: "San Diego" },
            { slug: "wine-country", name: "Wine Country" },
            { slug: "central-coast", name: "Central Coast" },
            { slug: "orange-county", name: "Orange County" },
            { slug: "desert", name: "Desert" },
            { slug: "inland-empire", name: "Inland Empire" },
          ].map((r) => (
            <Link
              key={r.slug}
              href={`/venues?region=${r.slug}`}
              className="card flex items-center justify-center px-4 py-5 text-center font-medium text-stone-700 hover:border-sage-300 hover:bg-sage-50/50"
            >
              {r.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-stone-200 bg-white py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-2xl font-semibold text-stone-800">Why use California Wedding Venues?</h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-3">
            <li className="card p-6">
              <h3 className="font-display text-lg font-semibold text-sage-800">Real leads only</h3>
              <p className="mt-2 text-sm text-stone-600">We never sell or fabricate inquiries. Every message is from a real couple.</p>
            </li>
            <li className="card p-6">
              <h3 className="font-display text-lg font-semibold text-sage-800">Compare easily</h3>
              <p className="mt-2 text-sm text-stone-600">Filter by budget, guest count, and style. Compare venues side-by-side.</p>
            </li>
            <li className="card p-6">
              <h3 className="font-display text-lg font-semibold text-sage-800">Free for couples</h3>
              <p className="mt-2 text-sm text-stone-600">Browse and contact venues at no cost. No signup required to inquire.</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="border-t border-stone-200 py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="font-display text-2xl font-semibold text-stone-800">Are you a venue?</h2>
          <p className="mt-2 text-stone-600">
            List your venue for free. Upgrade when you’re ready for more leads and visibility. Cancel anytime.
          </p>
          <Link href="/venue/signup" className="btn-primary mt-4">
            List your venue
          </Link>
        </div>
      </section>
    </div>
  );
}
