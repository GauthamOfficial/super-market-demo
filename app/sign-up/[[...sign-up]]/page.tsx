import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="auth-gate-modal flex min-h-[60vh] flex-col items-center justify-center py-12">
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-lg",
          },
          layout: {
            unsafe_disableDevelopmentModeWarnings: true,
          },
        }}
        afterSignUpUrl="/"
        signInUrl="/sign-in"
      />
    </div>
  );
}
