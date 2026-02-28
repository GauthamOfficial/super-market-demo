import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="auth-gate-modal flex min-h-[60vh] flex-col items-center justify-center py-12">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-lg",
          },
          layout: {
            unsafe_disableDevelopmentModeWarnings: true,
          },
        }}
        afterSignInUrl="/"
        signUpUrl="/sign-up"
      />
    </div>
  );
}
