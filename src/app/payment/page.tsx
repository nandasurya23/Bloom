"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { JSX } from "react";
import { 
  FiCreditCard, 
  FiCheckCircle, 
  FiChevronRight, 
  FiChevronLeft,
  FiUser,
  FiPhone,
  FiMail,
  FiMapPin,
  FiShoppingBag,
  FiShield,
  FiLock
} from "react-icons/fi";

import { formatCurrency } from "@/lib/formatCurrency";
import { createCheckoutOrder } from "@/lib/mockApi";
import {
  clearCheckoutData,
  readCheckoutData,
  saveOrderReceipt
} from "@/lib/orderSession";
import { generateOrderId } from "@/lib/uuid";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import type { CheckoutFormValues } from "@/types/checkout";

export default function PaymentPage(): JSX.Element {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const total = useCartStore((state) => state.total);
  const clearCart = useCartStore((state) => state.clearCart);
  const authUser = useAuthStore((state) => state.user);
  const loadUserFromStorage = useAuthStore((state) => state.loadUserFromStorage);

  const [customer, setCustomer] = useState<CheckoutFormValues | null>(null);
  const [isPaying, setIsPaying] = useState<boolean>(false);

  useEffect(() => {
    loadUserFromStorage();
    const data = readCheckoutData();
    setCustomer(data);
  }, [loadUserFromStorage]);

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

    await createCheckoutOrder({
      userId: authUser?.id ?? "guest",
      items,
      total
    });

    clearCheckoutData();
    clearCart();
    router.push("/success");
  };

  if (!customer) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-bloom-rose/5">
        <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="rounded-3xl border border-bloom-rose/20 bg-white/80 p-12 text-center shadow-xl backdrop-blur-sm">
            <div className="mx-auto flex max-w-md flex-col items-center">
              <div className="rounded-full bg-bloom-rose/10 p-6">
                <FiCreditCard className="h-12 w-12 text-bloom-rose/40" />
              </div>
              <h1 className="mt-6 text-3xl font-semibold text-bloom-ink">Checkout data not found</h1>
              <p className="mt-2 text-bloom-ink/60">
                Please complete your delivery information first before proceeding to payment.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/checkout"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-bloom-rose px-6 py-3 text-sm font-medium text-white shadow-lg shadow-bloom-rose/30 transition-all hover:bg-bloom-rose/90 hover:shadow-xl"
                >
                  <FiChevronLeft className="h-4 w-4" />
                  Back to Checkout
                </Link>
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center rounded-full border border-bloom-rose/30 bg-white/80 px-6 py-3 text-sm font-medium text-bloom-ink transition-all hover:bg-white hover:shadow-md"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-bloom-rose/5">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Progress Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-bloom-ink/60">
            <Link href="/cart" className="text-sm hover:text-bloom-rose transition-colors">
              Cart
            </Link>
            <FiChevronRight className="h-3 w-3" />
            <Link href="/checkout" className="text-sm hover:text-bloom-rose transition-colors">
              Checkout
            </Link>
            <FiChevronRight className="h-3 w-3" />
            <span className="text-sm font-medium text-bloom-rose">Payment</span>
          </div>
          
          <div className="mt-4 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="flex items-center gap-3 text-4xl font-light tracking-tight text-bloom-ink sm:text-5xl">
                <div className="rounded-full bg-bloom-rose/10 p-3">
                  <FiCreditCard className="h-6 w-6 text-bloom-rose" />
                </div>
                <span>
                  Complete <span className="font-semibold text-bloom-rose">Payment</span>
                </span>
              </h1>
              <p className="mt-2 text-base text-bloom-ink/60 ml-16">
                This is a simulation - no real payment will be processed
              </p>
            </div>
            
            <div className="rounded-full bg-amber-100 px-4 py-2 text-xs font-medium text-amber-700 flex items-center gap-2">
              <FiLock className="h-3 w-3" />
              Test Mode
            </div>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
          {/* Payment Section */}
          <div className="space-y-6">
            {/* Customer Details Card */}
            <section className="rounded-2xl border border-bloom-rose/20 bg-white/80 p-6 shadow-lg backdrop-blur-sm lg:p-8">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-bloom-ink">
                <FiUser className="h-5 w-5 text-bloom-rose" />
                Delivery Details
              </h2>
              
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-xl bg-bloom-rose/5 p-3">
                  <FiUser className="h-4 w-4 text-bloom-rose/60 mt-0.5" />
                  <div>
                    <p className="text-xs text-bloom-ink/40">Full Name</p>
                    <p className="text-sm font-medium text-bloom-ink">{customer.fullName}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 rounded-xl bg-bloom-rose/5 p-3">
                  <FiMail className="h-4 w-4 text-bloom-rose/60 mt-0.5" />
                  <div>
                    <p className="text-xs text-bloom-ink/40">Email</p>
                    <p className="text-sm font-medium text-bloom-ink break-all">{customer.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 rounded-xl bg-bloom-rose/5 p-3">
                  <FiPhone className="h-4 w-4 text-bloom-rose/60 mt-0.5" />
                  <div>
                    <p className="text-xs text-bloom-ink/40">Phone</p>
                    <p className="text-sm font-medium text-bloom-ink">{customer.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 rounded-xl bg-bloom-rose/5 p-3">
                  <FiMapPin className="h-4 w-4 text-bloom-rose/60 mt-0.5" />
                  <div>
                    <p className="text-xs text-bloom-ink/40">Address</p>
                    <p className="text-sm font-medium text-bloom-ink">
                      {customer.addressLine1}
                      {customer.addressLine2 && `, ${customer.addressLine2}`}
                    </p>
                    <p className="text-xs text-bloom-ink/40 mt-1">
                      {customer.city}, {customer.postalCode}
                    </p>
                  </div>
                </div>
              </div>

              {customer.notes && (
                <div className="mt-4 rounded-xl bg-bloom-rose/5 p-3">
                  <p className="text-xs text-bloom-ink/40">Delivery Notes</p>
                  <p className="text-sm text-bloom-ink/80 mt-1">{customer.notes}</p>
                </div>
              )}
            </section>

            {/* Payment Method Card */}
            <section className="rounded-2xl border border-bloom-rose/20 bg-white/80 p-6 shadow-lg backdrop-blur-sm lg:p-8">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-bloom-ink">
                <FiCreditCard className="h-5 w-5 text-bloom-rose" />
                Payment Method
              </h2>
              
              <div className="mt-6 space-y-4">
                {/* Demo Credit Card */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-bloom-rose to-rose-400 p-6 text-white shadow-xl">
                  <div className="absolute right-4 top-4">
                    <FiCreditCard className="h-8 w-8 opacity-50" />
                  </div>
                  <p className="text-lg font-light tracking-wider">**** **** **** 4242</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-xs opacity-75">Card Holder</p>
                      <p className="font-medium">{customer.fullName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs opacity-75">Expires</p>
                      <p className="font-medium">12/25</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-bloom-ink/40">
                  <FiCheckCircle className="h-4 w-4 text-emerald-500" />
                  <span>This is a demo payment method - no actual charge will be made</span>
                </div>
              </div>
            </section>
          </div>

          {/* Order Summary */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-2xl border border-bloom-rose/20 bg-white/80 p-6 shadow-lg backdrop-blur-sm">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-bloom-ink">
                <FiShoppingBag className="h-5 w-5 text-bloom-rose" />
                Order Summary
              </h2>
              
              {/* Items List */}
              <div className="mt-6 max-h-96 space-y-4 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.productId} className="flex gap-3">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-bloom-blush shadow-sm">
                      {item.imageUrl && (
                        <img 
                          src={item.imageUrl} 
                          alt={item.name}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between">
                        <h3 className="text-sm font-medium text-bloom-ink">{item.name}</h3>
                        <span className="text-sm font-semibold text-bloom-ink">
                          {formatCurrency(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-bloom-ink/40">
                        <span>{formatCurrency(item.unitPrice)} each</span>
                        <span className="h-1 w-1 rounded-full bg-bloom-rose/30" />
                        <span>Qty: {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="mt-6 space-y-3 border-t border-bloom-rose/20 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-bloom-ink/60">Subtotal ({itemCount} items)</span>
                  <span className="font-medium text-bloom-ink">{formatCurrency(total)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-bloom-ink/60">Shipping</span>
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                    Free
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-bloom-ink/60">Tax</span>
                  <span className="text-bloom-ink/40">Included</span>
                </div>
              </div>

              {/* Total */}
              <div className="mt-4 rounded-xl bg-gradient-to-r from-bloom-rose/5 to-transparent p-4">
                <div className="flex items-center justify-between">
                  <span className="text-base font-medium text-bloom-ink">Total to pay</span>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-bloom-rose">
                      {formatCurrency(total)}
                    </span>
                    <p className="text-xs text-bloom-ink/40">Final amount</p>
                  </div>
                </div>
              </div>

              {/* Pay Button */}
              <button
                type="button"
                onClick={() => {
                  void handleSimulatedPay();
                }}
                disabled={isPaying || items.length === 0}
                className="group relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-bloom-rose to-rose-400 px-6 py-4 text-base font-medium text-white shadow-lg shadow-bloom-rose/30 transition-all hover:shadow-xl hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="absolute inset-0 bg-white/20 translate-y-full transition-transform group-hover:translate-y-0" />
                {isPaying ? (
                  <>
                    <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span className="relative z-10">Processing payment...</span>
                  </>
                ) : (
                  <>
                    <FiLock className="h-5 w-5 relative z-10" />
                    <span className="relative z-10">Pay {formatCurrency(total)}</span>
                    <FiChevronRight className="h-5 w-5 relative z-10 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>

              {/* Security Note */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-bloom-ink/40">
                <FiShield className="h-4 w-4" />
                <span>This is a simulated payment - no real transaction</span>
              </div>

              {/* Back Link */}
              <Link
                href="/checkout"
                className="mt-4 flex items-center justify-center gap-1 text-sm text-bloom-ink/40 hover:text-bloom-rose transition-colors"
              >
                <FiChevronLeft className="h-4 w-4" />
                Return to delivery details
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}