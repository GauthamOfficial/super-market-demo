import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { getOrderByIdForClerkUser } from "@/lib/dal";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return {
    title: `Order ${id.slice(0, 8)}…`,
    description: "Order details",
  };
}

const statusVariant: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  packed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  dispatched: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  completed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  cancelled: "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400",
};

export default async function AccountOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { userId } = await auth();
  if (!userId) return null;

  const { id: orderId } = await params;
  const result = await getOrderByIdForClerkUser(orderId, userId);

  if (!result.ok) notFound();

  const { order, items, branch } = result.data;
  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.unit_price, 0);
  const deliveryFee = order.delivery_fee ?? 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/account">← Account</Link>
        </Button>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <div className="bg-primary/5 px-4 py-3 border-b flex flex-wrap items-center justify-between gap-2">
          <div>
            <h1 className="text-lg font-semibold text-foreground">Order details</h1>
            <p className="font-mono text-sm text-muted-foreground mt-0.5">
              {order.order_number}
            </p>
          </div>
          <span
            className={`inline-flex rounded-full px-3 py-1 text-sm font-medium capitalize ${statusVariant[order.status] ?? "bg-muted text-muted-foreground"}`}
          >
            {order.status}
          </span>
        </div>
        <div className="p-4 sm:p-6 space-y-4 text-left">
          <div className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <span className="text-muted-foreground">Date</span>
              <p className="font-medium">
                {new Date(order.created_at).toLocaleDateString(undefined, {
                  dateStyle: "long",
                  timeStyle: "short",
                })}
              </p>
            </div>
            {branch && (
              <div>
                <span className="text-muted-foreground">Branch</span>
                <p className="font-medium">{branch.name}</p>
              </div>
            )}
          </div>

          <div className="border-t pt-4">
            <p className="text-sm font-medium text-muted-foreground mb-2">Items</p>
            <ul className="space-y-2 text-sm">
              {items.map((item, idx) => (
                <li key={idx} className="flex justify-between gap-4">
                  <span className="text-foreground">
                    {item.variant?.name ?? "Item"} × {item.quantity}
                  </span>
                  <span className="font-medium tabular-nums">
                    {formatPrice(item.quantity * item.unit_price, siteConfig.currency)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="space-y-1.5 pt-3 border-t text-base mt-3">
              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatPrice(subtotal, siteConfig.currency)}</span>
              </div>
              {deliveryFee > 0 && (
                <div className="flex justify-between font-medium">
                  <span>Delivery</span>
                  <span className="tabular-nums">{formatPrice(deliveryFee, siteConfig.currency)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold pt-1">
                <span>Total</span>
                <span className="tabular-nums">{formatPrice(total, siteConfig.currency)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/order/track">Track order</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/account">Back to account</Link>
        </Button>
      </div>
    </div>
  );
}
