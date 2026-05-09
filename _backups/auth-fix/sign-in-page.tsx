import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-12">
      <SignIn
        routing="path"
        path="/sign-in"
        signUpUrl="/sign-up"
        forceRedirectUrl="/workspace"
        fallbackRedirectUrl="/workspace"
        fallback={<div className="text-white">Loading sign in...</div>}
      />
    </main>
  );
}
