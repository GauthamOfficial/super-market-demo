import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { getOrdersByClerkUserId } from "@/lib/dal";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import type { Order } from "@/types/db";

export const metadata = {
  title: "My account",
  description: "View your orders and account details",
};

const statusVariant: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  packed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  dispatched: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  cancelled: "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400",
};

function formatOrderDate(createdAt: string) {
  return new Date(createdAt).toLocaleDateString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function AccountPage() {
  const { userId } = await auth();
  if (!userId) return null;

  const result = await getOrdersByClerkUserId(userId, { limit: 30 });
  const orders = result.ok ? result.data : [];

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">My account</h1>
        <p className="mt-1 text-muted-foreground">
          View your order history and details.
        </p>
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-4">Order history</h2>
        {orders.length === 0 ? (
          <div className="rounded-xl border border-dashed bg-muted/30 p-8 text-center">
            <p className="text-muted-foreground mb-4">You haven&apos;t placed any orders yet.</p>
            <Button asChild>
              <Link href="/products">Start shopping</Link>
            </Button>
          </div>
        ) : (
          <ul className="space-y-3">
            {orders.map((order: Order) => (
              <li key={order.id}>
                <Link
                  href={`/account/orders/${order.id}`}
                  className="block rounded-xl border bg-card p-4 shadow-sm transition hover:border-primary/30 hover:shadow-md"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="font-mono font-semibold text-foreground">
                        {order.order_number}
                      </span>
                      <span className="ml-2 text-sm text-muted-foreground">
                        {formatOrderDate(order.created_at)}
                      </span>
                    </div>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusVariant[order.status] ?? "bg-muted text-muted-foreground"}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    View details →
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
