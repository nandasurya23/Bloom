"use client";

import Link from "next/link";
import type { JSX } from "react";
import { useEffect, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";

import { formatCurrency } from "@/lib/formatCurrency";
import { readOrderReceipt } from "@/lib/orderSession";
import type { OrderReceipt } from "@/types/checkout";

export default function SuccessPage(): JSX.Element {
  const [receipt, setReceipt] = useState<OrderReceipt | null>(null);

  useEffect(() => {
    setReceipt(readOrderReceipt());
  }, []);

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <section className="rounded-2xl border border-bloom-rose/50 bg-white p-6">
        <h1 className="flex items-center gap-2 text-3xl font-semibold text-bloom-ink">
          <FiCheckCircle className="text-bloom-leaf" /> Order Success
        </h1>
        {receipt ? (
          <>
            <p className="mt-2 text-sm text-bloom-ink/80">
              Thank you, {receipt.customerName}. Your order has been confirmed.
            </p>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-bloom-ink/70">Order ID</dt>
                <dd className="font-mono text-xs">{receipt.orderId}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-bloom-ink/70">Items</dt>
                <dd>{receipt.itemCount}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-bloom-ink/70">Total</dt>
                <dd>{formatCurrency(receipt.amount)}</dd>
              </div>
            </dl>
          </>
        ) : (
          <p className="mt-2 text-sm text-bloom-ink/80">No recent receipt found.</p>
        )}
        <div className="mt-6 flex gap-3">
          <Link href="/shop" className="rounded-full border border-bloom-rose/60 px-4 py-2 text-sm transition hover:bg-bloom-blush">
            Continue shopping
          </Link>
          <Link href="/checkout" className="rounded-full border border-bloom-rose/60 px-4 py-2 text-sm transition hover:bg-bloom-blush">
            New checkout
          </Link>
        </div>
      </section>
    </main>
  );
}
