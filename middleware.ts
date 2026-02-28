import { clerkMiddleware } from "@clerk/nextjs/server";
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// No auth.protect() here — sign-in is shown as an in-app modal, not redirect to accounts.dev
const clerkHandler = clerkMiddleware();

export async function middleware(request: NextRequest) {
  const response = await clerkHandler(request);
  return updateSession(request, response);
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)$).*)",
    "/(api|trpc)(.*)",
  ],
};
