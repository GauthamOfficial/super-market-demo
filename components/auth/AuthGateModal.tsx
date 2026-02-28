"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { SignIn } from "@clerk/nextjs";

const PROTECTED_PATHS = [
  "/home",
  "/products",
  "/product",
  "/category",
  "/search",
  "/cart",
  "/checkout",
  "/account",
  "/order",
];

function isProtectedPath(pathname: string): boolean {
  const path = pathname?.replace(/\/$/, "") || "/";
  return PROTECTED_PATHS.some((p) => path === p || path.startsWith(p + "/"));
}

/**
 * When the user is on a protected route and not signed in, shows the sign-in form
 * in a full-screen overlay on the same site (no redirect to accounts.dev).
 */
export function AuthGateModal() {
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;
  if (isSignedIn) return null;
  if (!isProtectedPath(pathname ?? "")) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Sign in"
    >
      <div className="auth-gate-modal relative max-h-[90vh] w-full max-w-[380px] overflow-y-auto rounded-2xl bg-background shadow-xl">
        <SignIn
          appearance={{
            elements: {
              rootBox: "w-full max-w-full mx-0 shadow-none",
              card: "shadow-none w-full max-w-full",
              cardBox: "w-full max-w-full",
            },
            layout: {
              socialButtonsPlacement: "top",
              socialButtonsVariant: "blockButton",
              unsafe_disableDevelopmentModeWarnings: true,
            },
          }}
          afterSignInUrl={pathname ?? "/"}
          signUpUrl="/sign-up"
        />
      </div>
    </div>
  );
}
