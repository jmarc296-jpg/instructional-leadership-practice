import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-12">
      <SignUp forceRedirectUrl="/workspace" />
    </main>
  );
}
