import Link from "next/link";
import { VenueLoginForm } from "@/components/VenueLoginForm";

export default function VenueLoginPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="font-display text-2xl font-semibold text-stone-800">Venue login</h1>
      <p className="mt-2 text-stone-600">
        Log in to manage your venue listing, view leads, and update your profile.
      </p>
      <VenueLoginForm />
      <p className="mt-6 text-center text-sm text-stone-500">
        Don’t have an account?{" "}
        <Link href="/venue/signup" className="text-sage-600 hover:underline">List your venue</Link>
      </p>
    </div>
  );
}
