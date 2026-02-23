"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { JSX } from "react";
import { FiCreditCard } from "react-icons/fi";

import { formatCurrency } from "@/lib/formatCurrency";
import {
  clearCheckoutData,
  readCheckoutData,
  saveOrderReceipt
} from "@/lib/orderSession";
import { generateOrderId } from "@/lib/uuid";
import { useCartStore } from "@/store/useCartStore";
import type { CheckoutFormValues } from "@/types/checkout";

export default function PaymentPage(): JSX.Element {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total);
  const clearCart = useCartStore((state) => state.clearCart);

  const [customer, setCustomer] = useState<CheckoutFormValues | null>(null);
  const [isPaying, setIsPaying] = useState<boolean>(false);

  useEffect(() => {
    const data = readCheckoutData();
    setCustomer(data);
  }, []);

  const handleSimulatedPay = async (): Promise<void> => {
    if (!customer || items.length === 0) {
      return;
    }

    setIsPaying(true);
    await new Promise((resolve) => {
      window.setTimeout(resolve, 1200);
    });

    saveOrderReceipt({
      orderId: generateOrderId(),
      customerName: customer.fullName,
      amount: total,
      itemCount: items.reduce((accumulator, item) => accumulator + item.quantity, 0),
      createdAt: new Date().toISOString()
    });

    clearCheckoutData();
    clearCart();
    router.push("/success");
  };

  if (!customer) {
    return (
      <main className="mx-auto w-full max-w-3xl px-6 py-10">
        <h1 className="text-3xl font-semibold text-bloom-ink">Payment</h1>
        <p className="mt-4 text-sm text-bloom-ink/80">
          Checkout data not found. Please complete checkout first.
        </p>
        <Link href="/checkout" className="mt-4 inline-block rounded-md border border-bloom-rose/60 px-4 py-2 text-sm">
          Back to checkout
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-6 py-10">
      <h1 className="flex items-center gap-2 text-3xl font-semibold text-bloom-ink">
        <FiCreditCard className="text-bloom-ink/70" /> Payment Simulation
      </h1>
      <p className="mt-2 text-sm text-bloom-ink/70">No real gateway is used. This confirms frontend flow only.</p>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <section className="rounded-2xl border border-bloom-rose/50 bg-white p-5">
          <h2 className="text-lg font-medium text-bloom-ink">Customer Details</h2>
          <dl className="mt-4 grid gap-2 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-bloom-ink/70">Name</dt>
              <dd>{customer.fullName}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-bloom-ink/70">Email</dt>
              <dd>{customer.email}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-bloom-ink/70">Phone</dt>
              <dd>{customer.phone}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-bloom-ink/70">Address</dt>
              <dd className="text-right">{customer.addressLine1}</dd>
            </div>
          </dl>
        </section>

        <aside className="rounded-2xl border border-bloom-rose/50 bg-white p-5">
          <h2 className="text-lg font-medium text-bloom-ink">Order Summary</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {items.map((item) => (
              <li key={item.productId} className="flex justify-between gap-4">
                <span className="text-bloom-ink/80">
                  {item.name} x {item.quantity}
                </span>
                <span>{formatCurrency(item.unitPrice * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-bloom-rose/40 pt-4 text-sm">
            <div className="flex items-center justify-between font-medium">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              void handleSimulatedPay();
            }}
            disabled={isPaying || items.length === 0}
            className="mt-5 w-full rounded-full border border-bloom-rose/60 px-4 py-2 text-sm font-medium transition hover:bg-bloom-blush disabled:opacity-50"
          >
            {isPaying ? "Processing payment..." : "Pay now (Simulation)"}
          </button>
        </aside>
      </div>
    </main>
  );
}
