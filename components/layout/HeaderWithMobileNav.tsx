"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Container } from "@/components/layout/container";
import { CartTrigger } from "@/features/cart/CartTrigger";
import { HeaderNav } from "@/components/layout/HeaderNav";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

const LINKS = [
  { href: "/", label: "Home", match: (path: string) => path === "/" },
  { href: "/products", label: "Products", match: (path: string) => path === "/products" || path.startsWith("/products/") },
  { href: "/about", label: "About Us", match: (path: string) => path === "/about" },
  { href: "/contact", label: "Contact Us", match: (path: string) => path === "/contact" },
] as const;

export function HeaderWithMobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const path = (pathname ?? "").replace(/\/$/, "") || "/";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-gradient-to-r from-primary from-0% via-primary via-[45%] to-transparent to-[85%] md:via-primary md:via-20% md:to-transparent md:to-40% bg-background/98 shadow-sm backdrop-blur-md">
      <Container className="flex h-14 min-h-14 items-center gap-4 sm:gap-6 md:h-16 md:gap-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2 font-semibold text-white transition-opacity hover:opacity-90 sm:gap-3"
        >
          <span
            className="flex h-9 w-9 shrink-0 rounded-lg bg-neutral-400 sm:h-10 sm:w-10 md:h-11 md:w-11"
            aria-hidden
          />
          <span className="font-brand text-sm font-normal tracking-tight text-white sm:text-base md:text-lg" style={{ letterSpacing: "0.03em" }}>
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop nav — hidden on small screens */}
        <nav
          className="hidden flex-1 items-center justify-center gap-1 text-sm md:flex"
          aria-label="Main navigation"
        >
          <HeaderNav />
          <SignedIn>
            <Link
              href="/account"
              className={`rounded-md px-3 py-2 font-medium transition-colors ${
                path.startsWith("/account")
                  ? "bg-primary/12 text-primary shadow-sm ring-1 ring-primary/30"
                  : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
              }`}
              aria-current={path.startsWith("/account") ? "page" : undefined}
            >
              Account
            </Link>
          </SignedIn>
        </nav>

        {/* Right side: auth, cart, menu (menu only on mobile), right-aligned */}
        <div className="ml-auto flex shrink-0 items-center justify-end gap-2">
          <SignedOut>
            <SignInButton mode="modal">
              <Button
                variant="outline"
                size="sm"
                className="hidden border-white/60 bg-transparent text-white hover:bg-white/15 hover:text-white md:inline-flex"
              >
                Sign in
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button
                size="sm"
                className="hidden bg-white text-primary hover:bg-white/90 md:inline-flex"
              >
                Sign up
              </Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-9 w-9 md:h-9 md:w-9 ring-2 ring-white/30",
                },
              }}
            />
          </SignedIn>
          <CartTrigger />
          <div className="md:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-black hover:bg-black/10 hover:text-black"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" showClose={false} className="w-[min(100vw-2rem,320px)] p-0">
                <SheetHeader className="flex flex-row items-center gap-3 border-b border-primary/20 bg-gradient-to-r from-primary via-primary/95 to-primary/80 p-4 text-left">
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                  <span
                    className="flex h-10 w-10 shrink-0 rounded-lg bg-neutral-400"
                    aria-hidden
                  />
                  <span className="font-brand text-base font-normal tracking-tight text-white" style={{ letterSpacing: "0.03em" }}>
                    {siteConfig.name}
                  </span>
                </SheetHeader>
                <nav className="flex flex-col gap-1 p-2" aria-label="Mobile navigation">
                  {LINKS.map(({ href, label, match }) => {
                    const isActive = match(path);
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setOpen(false)}
                        className={`rounded-md px-3 py-2.5 font-medium transition-colors ${
                          isActive
                            ? "bg-primary/12 text-primary"
                            : "text-foreground hover:bg-muted"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {label}
                      </Link>
                    );
                  })}
                  <SignedIn>
                    <Link
                      href="/account"
                      onClick={() => setOpen(false)}
                      className={`rounded-md px-3 py-2.5 font-medium transition-colors ${
                        path.startsWith("/account")
                          ? "bg-primary/12 text-primary"
                          : "text-foreground hover:bg-muted"
                      }`}
                      aria-current={path.startsWith("/account") ? "page" : undefined}
                    >
                      Account
                    </Link>
                  </SignedIn>
                  <div className="my-2 flex flex-col gap-2 border-t pt-2">
                    <SignedOut>
                      <SignInButton mode="modal">
                        <Button variant="outline" className="w-full justify-center" onClick={() => setOpen(false)}>
                          Sign in
                        </Button>
                      </SignInButton>
                      <SignUpButton mode="modal">
                        <Button className="w-full justify-center" onClick={() => setOpen(false)}>
                          Sign up
                        </Button>
                      </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                      <div className="flex items-center justify-between px-3 py-2">
                        <span className="text-sm font-medium">Account</span>
                        <UserButton afterSignOutUrl="/" />
                      </div>
                    </SignedIn>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
}
