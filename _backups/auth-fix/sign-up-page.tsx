import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-12">
      <SignUp
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        forceRedirectUrl="/workspace"
        fallbackRedirectUrl="/workspace"
        fallback={<div className="text-white">Loading sign up...</div>}
      />
    </main>
  );
}
