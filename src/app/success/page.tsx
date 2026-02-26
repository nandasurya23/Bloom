"use client";

import Link from "next/link";
import type { JSX } from "react";
import { useEffect, useState } from "react";
import { 
  FiCheckCircle, 
  FiShoppingBag, 
  FiCalendar, 
  FiClock, 
  FiMapPin,
  FiHome,
  FiMail,
  FiPhone,
  FiPrinter,
  FiShare2
} from "react-icons/fi";

import { formatCurrency } from "@/lib/formatCurrency";
import { readOrderReceipt } from "@/lib/orderSession";
import type { OrderReceipt } from "@/types/checkout";

export default function SuccessPage(): JSX.Element {
  const [receipt, setReceipt] = useState<OrderReceipt | null>(null);

  useEffect(() => {
    setReceipt(readOrderReceipt());
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-bloom-rose/5">
      {/* Confetti Effect Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-bloom-rose/10 blur-3xl" />
        <div className="absolute top-1/2 -left-4 h-40 w-40 rounded-full bg-bloom-leaf/10 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-24 w-24 rounded-full bg-bloom-rose/10 blur-2xl" />
      </div>

      <div className="relative mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Success Animation */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 animate-ping rounded-full bg-bloom-leaf/30" />
            <div className="relative rounded-full bg-gradient-to-br from-bloom-leaf to-emerald-400 p-6 shadow-xl shadow-bloom-leaf/30">
              <FiCheckCircle className="h-16 w-16 text-white" />
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-light tracking-tight text-bloom-ink sm:text-5xl">
            Order <span className="font-semibold text-bloom-leaf">Confirmed</span>
          </h1>
          <p className="mt-3 text-lg text-bloom-ink/60">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
        </div>

        {receipt ? (
          <>
            {/* Order Success Message */}
            <div className="mb-8 rounded-2xl bg-gradient-to-r from-bloom-leaf/10 to-emerald-500/10 p-6 text-center border border-bloom-leaf/20">
              <p className="text-lg text-bloom-ink/80">
                <span className="font-semibold text-bloom-leaf">{receipt.customerName}</span>, we're preparing your order with love and care.
              </p>
              <p className="mt-2 text-sm text-bloom-ink/60">
                You'll receive a confirmation email shortly with your order details.
              </p>
            </div>

            {/* Order Receipt Card */}
            <div className="overflow-hidden rounded-3xl border border-bloom-rose/20 bg-white/80 shadow-xl backdrop-blur-sm">
              {/* Receipt Header */}
              <div className="border-b border-bloom-rose/20 bg-gradient-to-r from-bloom-rose/5 to-transparent p-6 sm:p-8">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-bloom-ink/40">
                      <FiShoppingBag className="h-4 w-4" />
                      <span>Order Receipt</span>
                    </div>
                    <p className="mt-2 font-mono text-xs text-bloom-ink/30">
                      {receipt.orderId}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => window.print()}
                      className="rounded-full border border-bloom-rose/30 bg-white/80 p-3 text-bloom-ink/40 transition-all hover:border-bloom-rose hover:text-bloom-rose"
                      aria-label="Print receipt"
                    >
                      <FiPrinter className="h-4 w-4" />
                    </button>
                    <button 
                      className="rounded-full border border-bloom-rose/30 bg-white/80 p-3 text-bloom-ink/40 transition-all hover:border-bloom-rose hover:text-bloom-rose"
                      aria-label="Share receipt"
                    >
                      <FiShare2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Receipt Body */}
              <div className="p-6 sm:p-8">
                {/* Date & Time */}
                <div className="grid grid-cols-2 gap-4 rounded-xl bg-bloom-rose/5 p-4">
                  <div className="flex items-center gap-3">
                    <FiCalendar className="h-5 w-5 text-bloom-rose/40" />
                    <div>
                      <p className="text-xs text-bloom-ink/40">Order Date</p>
                      <p className="text-sm font-medium text-bloom-ink">{formatDate(receipt.createdAt)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FiClock className="h-5 w-5 text-bloom-rose/40" />
                    <div>
                      <p className="text-xs text-bloom-ink/40">Order Time</p>
                      <p className="text-sm font-medium text-bloom-ink">{formatTime(receipt.createdAt)}</p>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="mt-6">
                  <h2 className="text-lg font-semibold text-bloom-ink">Order Summary</h2>
                  
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between border-b border-bloom-rose/10 pb-2">
                      <span className="text-sm text-bloom-ink/60">Items purchased</span>
                      <span className="text-sm font-medium text-bloom-ink">{receipt.itemCount}</span>
                    </div>
                    
                    <div className="flex items-center justify-between border-b border-bloom-rose/10 pb-2">
                      <span className="text-sm text-bloom-ink/60">Subtotal</span>
                      <span className="text-sm text-bloom-ink">{formatCurrency(receipt.amount)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between border-b border-bloom-rose/10 pb-2">
                      <span className="text-sm text-bloom-ink/60">Shipping</span>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                        Free
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between border-b border-bloom-rose/10 pb-2">
                      <span className="text-sm text-bloom-ink/60">Tax</span>
                      <span className="text-sm text-bloom-ink/40">Included</span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-base font-semibold text-bloom-ink">Total Amount</span>
                      <span className="text-2xl font-bold text-bloom-rose">
                        {formatCurrency(receipt.amount)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Delivery Information Placeholder */}
                <div className="mt-8 rounded-xl border border-bloom-rose/10 bg-bloom-rose/5 p-4">
                  <h3 className="flex items-center gap-2 text-sm font-medium text-bloom-ink">
                    <FiMapPin className="h-4 w-4 text-bloom-rose" />
                    Delivery Information
                  </h3>
                  <div className="mt-3 grid gap-3 text-sm text-bloom-ink/60">
                    <p>Your order will be delivered within 3-5 business days.</p>
                    <div className="flex items-center gap-2 text-xs text-bloom-ink/40">
                      <FiHome className="h-3 w-3" />
                      <span>Shipping address provided at checkout</span>
                    </div>
                  </div>
                </div>

                {/* What's Next */}
                <div className="mt-8">
                  <h3 className="text-sm font-medium text-bloom-ink">What's next?</h3>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div className="flex items-start gap-2 text-xs text-bloom-ink/60">
                      <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-bloom-rose" />
                      <p>You'll receive order confirmation via email</p>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-bloom-ink/60">
                      <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-bloom-rose" />
                      <p>Track your order in real-time</p>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-bloom-ink/60">
                      <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-bloom-rose" />
                      <p>We'll notify you when it ships</p>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-bloom-ink/60">
                      <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-bloom-rose" />
                      <p>Contact us for any questions</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-bloom-rose to-rose-400 px-8 py-4 text-sm font-medium text-white shadow-lg shadow-bloom-rose/30 transition-all hover:shadow-xl hover:brightness-110"
              >
                Continue Shopping
                <FiShoppingBag className="h-4 w-4" />
              </Link>
              
              <Link
                href="/orders"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-bloom-rose/30 bg-white/80 px-8 py-4 text-sm font-medium text-bloom-ink transition-all hover:bg-white hover:shadow-md"
              >
                View My Orders
                <FiCalendar className="h-4 w-4" />
              </Link>
            </div>

            {/* Help Text */}
            <p className="mt-6 text-center text-xs text-bloom-ink/30">
              Need help? Contact our support team at support@bloom.com
            </p>
          </>
        ) : (
          <div className="rounded-3xl border border-bloom-rose/20 bg-white/80 p-12 text-center shadow-xl backdrop-blur-sm">
            <div className="mx-auto flex max-w-md flex-col items-center">
              <div className="rounded-full bg-bloom-rose/10 p-6">
                <FiShoppingBag className="h-12 w-12 text-bloom-rose/40" />
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-bloom-ink">No recent receipt found</h2>
              <p className="mt-2 text-bloom-ink/60">
                We couldn't find any recent order receipt. Start shopping to place your first order.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-bloom-rose px-8 py-3 text-sm font-medium text-white shadow-lg shadow-bloom-rose/30 transition-all hover:bg-bloom-rose/90 hover:shadow-xl"
                >
                  Browse Flowers
                </Link>
                <Link
                  href="/checkout"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-bloom-rose/30 bg-white/80 px-8 py-3 text-sm font-medium text-bloom-ink transition-all hover:bg-white hover:shadow-md"
                >
                  New Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}