"use client";

import Link from "next/link";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

interface ViewProductButtonProps {
  slug: string;
  label: string;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

/**
 * When signed in: link to product page.
 * When signed out: opens Clerk sign-in modal; after sign-in redirects to the product page.
 */
export function ViewProductButton({
  slug,
  label,
  className,
  size = "sm",
  variant = "default",
}: ViewProductButtonProps) {
  const productUrl = `/product/${slug}`;

  return (
    <>
      <SignedOut>
        <SignInButton mode="modal" fallbackRedirectUrl={productUrl}>
          <Button variant={variant} size={size} className={className ?? ""}>
            {label}
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <Button variant={variant} size={size} className={className ?? ""} asChild>
          <Link href={productUrl}>{label}</Link>
        </Button>
      </SignedIn>
    </>
  );
}
