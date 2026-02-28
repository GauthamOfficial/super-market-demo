import { getBranches } from "@/lib/dal";
import { siteConfig } from "@/config/site";

export const BRANCH_COOKIE_NAME = "selected-branch-id";
export const BRANCH_LOCALSTORAGE_KEY = "selected-branch-id";

const MAX_AGE = 60 * 60 * 24 * 365; // 1 year

type CookieStore = { get: (name: string) => { value: string } | undefined; set: (name: string, value: string, options?: Record<string, unknown>) => void };

/** Get selected branch id from cookie (server). */
export function getSelectedBranchId(cookieStore: CookieStore): string | null {
  const cookie = cookieStore.get(BRANCH_COOKIE_NAME);
  return cookie?.value?.trim() || null;
}

/**
 * Get branch id for the shop. In single-shop mode, if no cookie is set, fetches branches,
 * sets the only branch in the cookie and returns it. In multi-branch mode, returns cookie value or null.
 */
export async function getOrSetBranchId(cookieStore: CookieStore): Promise<string | null> {
  const existing = getSelectedBranchId(cookieStore);
  if (existing) return existing;

  if (siteConfig.branchesMode !== "single") return null;

  const result = await getBranches();
  if (!result.ok || result.data.length !== 1) return null;

  const branchId = result.data[0].id;
  setSelectedBranchId(cookieStore, branchId);
  return branchId;
}

/** Set selected branch id in cookie (server). Call from Server Action. */
export function setSelectedBranchId(
  cookieStore: CookieStore,
  branchId: string
): void {
  cookieStore.set(BRANCH_COOKIE_NAME, branchId, {
    path: "/",
    maxAge: MAX_AGE,
    sameSite: "lax",
    httpOnly: false, // so client can read if needed
    secure: process.env.NODE_ENV === "production",
  });
}
