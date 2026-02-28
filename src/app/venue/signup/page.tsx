import Link from "next/link";
import { VenueSignupForm } from "@/components/VenueSignupForm";

export default function VenueSignupPage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <h1 className="font-display text-2xl font-semibold text-stone-800">List your venue</h1>
      <p className="mt-2 text-stone-600">
        Create an account and submit your venue for review. You’ll be able to manage your profile and view leads here. No long-term contracts—cancel anytime.
      </p>
      <VenueSignupForm />
      <p className="mt-6 text-center text-sm text-stone-500">
        Already have an account?{" "}
        <Link href="/venue/login" className="text-sage-600 hover:underline">Log in</Link>
      </p>
    </div>
  );
}
