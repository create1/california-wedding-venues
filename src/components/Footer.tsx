import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-100">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="font-display text-sm font-semibold text-stone-800">Browse</h3>
            <ul className="mt-3 space-y-2 text-sm text-stone-600">
              <li>
                <Link href="/venues" className="hover:text-sage-700">All venues</Link>
              </li>
              <li>
                <Link href="/venues?region=bay-area" className="hover:text-sage-700">Bay Area</Link>
              </li>
              <li>
                <Link href="/venues?region=los-angeles" className="hover:text-sage-700">Los Angeles</Link>
              </li>
              <li>
                <Link href="/venues?region=san-diego" className="hover:text-sage-700">San Diego</Link>
              </li>
              <li>
                <Link href="/venues?region=wine-country" className="hover:text-sage-700">Wine Country</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-sm font-semibold text-stone-800">For venues</h3>
            <ul className="mt-3 space-y-2 text-sm text-stone-600">
              <li>
                <Link href="/venue/signup" className="hover:text-sage-700">List your venue</Link>
              </li>
              <li>
                <Link href="/venue/login" className="hover:text-sage-700">Venue login</Link>
              </li>
              <li>
                <Link href="/help#for-venues" className="hover:text-sage-700">FAQ for venues</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-sm font-semibold text-stone-800">Help</h3>
            <ul className="mt-3 space-y-2 text-sm text-stone-600">
              <li>
                <Link href="/help" className="hover:text-sage-700">Help center</Link>
              </li>
              <li>
                <Link href="/help#faq" className="hover:text-sage-700">FAQ</Link>
              </li>
              <li>
                <Link href="/help#contact" className="hover:text-sage-700">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-display text-sm font-semibold text-stone-800">California Wedding Venues</p>
            <p className="mt-2 text-sm text-stone-500">
              Find and compare wedding venues across California. No fake leads—real couples, real venues.
            </p>
          </div>
        </div>
        <div className="mt-10 border-t border-stone-200 pt-6 text-center text-sm text-stone-500">
          <Link href="/privacy" className="hover:text-stone-700">Privacy</Link>
          <span className="mx-2">·</span>
          <Link href="/terms" className="hover:text-stone-700">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
