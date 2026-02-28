"use client";

import { ShoppingCart } from "lucide-react";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { useCartStore } from "@/features/cart/store";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface AddToCartButtonProps {
  branchId: string;
  variantId: string;
  productName: string;
  variantLabel: string;
  unitPrice: number;
  imageUrl: string | null;
  disabled?: boolean;
}

function AddToCartButtonInner({
  branchId,
  variantId,
  productName,
  variantLabel,
  unitPrice,
  imageUrl,
  disabled = false,
}: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <Button
      type="button"
      variant="default"
      size="sm"
      disabled={disabled}
      className="rounded-md"
      onClick={() => {
        addItem({
          branchId,
          variantId,
          productName,
          variantLabel,
          unitPrice,
          imageUrl,
          qty: 1,
        });
        toast({
          title: (
            <span className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4 shrink-0 text-primary" />
              Added to cart
            </span>
          ),
          description: variantLabel ? `${productName} (${variantLabel})` : productName,
        });
      }}
    >
      Add to cart
    </Button>
  );
}

export function AddToCartButton(props: AddToCartButtonProps) {
  return (
    <>
      <SignedOut>
        <SignInButton mode="modal">
          <Button
            type="button"
            variant="default"
            size="sm"
            disabled={props.disabled}
            className="rounded-md"
          >
            Add to cart
          </Button>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <AddToCartButtonInner {...props} />
      </SignedIn>
    </>
  );
}
