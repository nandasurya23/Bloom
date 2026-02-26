"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { JSX } from "react";
import { 
  FiChevronRight, 
  FiMapPin, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiHome, 
  FiMap,
  FiEdit3,
  FiShoppingBag,
  FiShield,
  FiTruck,
  FiCreditCard
} from "react-icons/fi";
import { useForm } from "react-hook-form";

import { formatCurrency } from "@/lib/formatCurrency";
import { saveCheckoutData } from "@/lib/orderSession";
import { useCartStore } from "@/store/useCartStore";
import type { CheckoutFormValues } from "@/types/checkout";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\-\s]{8,16}$/;
const POSTAL_CODE_REGEX = /^[0-9]{5}$/;

export default function CheckoutPage(): JSX.Element {
  const router = useRouter();
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal);
  const total = useCartStore((state) => state.total);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }
  } = useForm<CheckoutFormValues>({
    mode: "onBlur",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      postalCode: "",
      notes: ""
    }
  });

  const onSubmit = (values: CheckoutFormValues): void => {
    saveCheckoutData(values);
    router.push("/payment");
  };

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
            <span className="text-sm font-medium text-bloom-rose">Checkout</span>
            <FiChevronRight className="h-3 w-3 text-bloom-ink/30" />
            <span className="text-sm text-bloom-ink/30">Payment</span>
          </div>
          <h1 className="mt-4 flex items-center gap-3 text-4xl font-light tracking-tight text-bloom-ink sm:text-5xl">
            <div className="rounded-full bg-bloom-rose/10 p-3">
              <FiMapPin className="h-6 w-6 text-bloom-rose" />
            </div>
            <span>
              Delivery <span className="font-semibold text-bloom-rose">Details</span>
            </span>
          </h1>
          <p className="mt-2 text-base text-bloom-ink/60 ml-16">
            Fill in your information to complete the order
          </p>
        </div>

        {items.length === 0 ? (
          <section className="rounded-3xl border border-bloom-rose/20 bg-white/80 p-12 text-center shadow-xl backdrop-blur-sm">
            <div className="mx-auto flex max-w-md flex-col items-center">
              <div className="rounded-full bg-bloom-rose/10 p-6">
                <FiShoppingBag className="h-12 w-12 text-bloom-rose/40" />
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-bloom-ink">Your cart is empty</h2>
              <p className="mt-2 text-bloom-ink/60">
                Add some items to your cart before proceeding to checkout.
              </p>
              <Link
                href="/shop"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-bloom-rose px-8 py-3 text-sm font-medium text-white shadow-lg shadow-bloom-rose/30 transition-all hover:bg-bloom-rose/90 hover:shadow-xl"
              >
                Browse Flowers
                <FiChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-12">
            {/* Checkout Form */}
            <div className="space-y-6">
              {/* Form Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-bloom-ink">Shipping Information</h2>
                <span className="text-xs text-bloom-ink/40">All fields marked with * are required</span>
              </div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 rounded-2xl border border-bloom-rose/20 bg-white/80 p-6 shadow-lg backdrop-blur-sm lg:p-8"
              >
                {/* Full Name */}
                <div className="space-y-2">
                  <label htmlFor="fullName" className="flex items-center gap-2 text-sm font-medium text-bloom-ink">
                    <FiUser className="h-4 w-4 text-bloom-rose" />
                    Full name <span className="text-bloom-rose">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    {...register("fullName", {
                      required: "Full name is required",
                      minLength: { value: 3, message: "Minimum 3 characters" }
                    })}
                    placeholder="John Doe"
                    className={`
                      w-full rounded-xl border bg-white/90 px-4 py-3 text-sm text-bloom-ink
                      outline-none transition-all placeholder:text-bloom-ink/30
                      focus:border-bloom-rose focus:ring-2 focus:ring-bloom-rose/20
                      ${errors.fullName ? 'border-red-300 bg-red-50/50' : 'border-bloom-rose/30'}
                    `}
                  />
                  {errors.fullName && (
                    <p className="flex items-center gap-1 text-xs text-red-500">
                      <span className="h-1 w-1 rounded-full bg-red-500" />
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Email & Phone Grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-bloom-ink">
                      <FiMail className="h-4 w-4 text-bloom-rose" />
                      Email <span className="text-bloom-rose">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: { value: EMAIL_REGEX, message: "Enter a valid email address" }
                      })}
                      placeholder="john@example.com"
                      className={`
                        w-full rounded-xl border bg-white/90 px-4 py-3 text-sm text-bloom-ink
                        outline-none transition-all placeholder:text-bloom-ink/30
                        focus:border-bloom-rose focus:ring-2 focus:ring-bloom-rose/20
                        ${errors.email ? 'border-red-300 bg-red-50/50' : 'border-bloom-rose/30'}
                      `}
                    />
                    {errors.email && (
                      <p className="flex items-center gap-1 text-xs text-red-500">
                        <span className="h-1 w-1 rounded-full bg-red-500" />
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-bloom-ink">
                      <FiPhone className="h-4 w-4 text-bloom-rose" />
                      Phone <span className="text-bloom-rose">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      {...register("phone", {
                        required: "Phone number is required",
                        pattern: { value: PHONE_REGEX, message: "Enter a valid phone number" }
                      })}
                      placeholder="+62 812 3456 7890"
                      className={`
                        w-full rounded-xl border bg-white/90 px-4 py-3 text-sm text-bloom-ink
                        outline-none transition-all placeholder:text-bloom-ink/30
                        focus:border-bloom-rose focus:ring-2 focus:ring-bloom-rose/20
                        ${errors.phone ? 'border-red-300 bg-red-50/50' : 'border-bloom-rose/30'}
                      `}
                    />
                    {errors.phone && (
                      <p className="flex items-center gap-1 text-xs text-red-500">
                        <span className="h-1 w-1 rounded-full bg-red-500" />
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Address Line 1 */}
                <div className="space-y-2">
                  <label htmlFor="addressLine1" className="flex items-center gap-2 text-sm font-medium text-bloom-ink">
                    <FiHome className="h-4 w-4 text-bloom-rose" />
                    Address line 1 <span className="text-bloom-rose">*</span>
                  </label>
                  <input
                    id="addressLine1"
                    type="text"
                    {...register("addressLine1", {
                      required: "Address is required",
                      minLength: { value: 8, message: "Address is too short" }
                    })}
                    placeholder="Jl. Merdeka No. 123"
                    className={`
                      w-full rounded-xl border bg-white/90 px-4 py-3 text-sm text-bloom-ink
                      outline-none transition-all placeholder:text-bloom-ink/30
                      focus:border-bloom-rose focus:ring-2 focus:ring-bloom-rose/20
                      ${errors.addressLine1 ? 'border-red-300 bg-red-50/50' : 'border-bloom-rose/30'}
                    `}
                  />
                  {errors.addressLine1 && (
                    <p className="flex items-center gap-1 text-xs text-red-500">
                      <span className="h-1 w-1 rounded-full bg-red-500" />
                      {errors.addressLine1.message}
                    </p>
                  )}
                </div>

                {/* Address Line 2 (Optional) */}
                <div className="space-y-2">
                  <label htmlFor="addressLine2" className="flex items-center gap-2 text-sm font-medium text-bloom-ink">
                    <FiEdit3 className="h-4 w-4 text-bloom-rose" />
                    Address line 2 <span className="text-xs text-bloom-ink/40">(optional)</span>
                  </label>
                  <input
                    id="addressLine2"
                    type="text"
                    {...register("addressLine2")}
                    placeholder="RT/RW, Kelurahan, Kecamatan"
                    className="w-full rounded-xl border border-bloom-rose/30 bg-white/90 px-4 py-3 text-sm text-bloom-ink outline-none transition-all placeholder:text-bloom-ink/30 focus:border-bloom-rose focus:ring-2 focus:ring-bloom-rose/20"
                  />
                </div>

                {/* City & Postal Code Grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="city" className="flex items-center gap-2 text-sm font-medium text-bloom-ink">
                      <FiMap className="h-4 w-4 text-bloom-rose" />
                      City <span className="text-bloom-rose">*</span>
                    </label>
                    <input
                      id="city"
                      type="text"
                      {...register("city", {
                        required: "City is required",
                        minLength: { value: 2, message: "City name is too short" }
                      })}
                      placeholder="Jakarta"
                      className={`
                        w-full rounded-xl border bg-white/90 px-4 py-3 text-sm text-bloom-ink
                        outline-none transition-all placeholder:text-bloom-ink/30
                        focus:border-bloom-rose focus:ring-2 focus:ring-bloom-rose/20
                        ${errors.city ? 'border-red-300 bg-red-50/50' : 'border-bloom-rose/30'}
                      `}
                    />
                    {errors.city && (
                      <p className="flex items-center gap-1 text-xs text-red-500">
                        <span className="h-1 w-1 rounded-full bg-red-500" />
                        {errors.city.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="postalCode" className="flex items-center gap-2 text-sm font-medium text-bloom-ink">
                      <FiMap className="h-4 w-4 text-bloom-rose" />
                      Postal code <span className="text-bloom-rose">*</span>
                    </label>
                    <input
                      id="postalCode"
                      type="text"
                      {...register("postalCode", {
                        required: "Postal code is required",
                        pattern: { value: POSTAL_CODE_REGEX, message: "Use a valid 5-digit postal code" }
                      })}
                      placeholder="12345"
                      className={`
                        w-full rounded-xl border bg-white/90 px-4 py-3 text-sm text-bloom-ink
                        outline-none transition-all placeholder:text-bloom-ink/30
                        focus:border-bloom-rose focus:ring-2 focus:ring-bloom-rose/20
                        ${errors.postalCode ? 'border-red-300 bg-red-50/50' : 'border-bloom-rose/30'}
                      `}
                    />
                    {errors.postalCode && (
                      <p className="flex items-center gap-1 text-xs text-red-500">
                        <span className="h-1 w-1 rounded-full bg-red-500" />
                        {errors.postalCode.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <label htmlFor="notes" className="flex items-center gap-2 text-sm font-medium text-bloom-ink">
                    <FiEdit3 className="h-4 w-4 text-bloom-rose" />
                    Notes <span className="text-xs text-bloom-ink/40">(optional, max 200 characters)</span>
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    {...register("notes", {
                      maxLength: { value: 200, message: "Max 200 characters" }
                    })}
                    placeholder="Special instructions for delivery..."
                    className={`
                      w-full rounded-xl border bg-white/90 px-4 py-3 text-sm text-bloom-ink
                      outline-none transition-all placeholder:text-bloom-ink/30
                      focus:border-bloom-rose focus:ring-2 focus:ring-bloom-rose/20
                      ${errors.notes ? 'border-red-300 bg-red-50/50' : 'border-bloom-rose/30'}
                    `}
                  />
                  {errors.notes && (
                    <p className="flex items-center gap-1 text-xs text-red-500">
                      <span className="h-1 w-1 rounded-full bg-red-500" />
                      {errors.notes.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex flex-col gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || items.length === 0}
                    className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-bloom-rose to-rose-400 px-6 py-4 text-base font-medium text-white shadow-lg shadow-bloom-rose/30 transition-all hover:shadow-xl hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <span className="absolute inset-0 bg-white/20 translate-y-full transition-transform group-hover:translate-y-0" />
                    <FiCreditCard className="h-5 w-5 relative z-10" />
                    <span className="relative z-10">Continue to Payment</span>
                    <FiChevronRight className="h-5 w-5 relative z-10 transition-transform group-hover:translate-x-1" />
                  </button>
                  
                  <Link
                    href="/cart"
                    className="text-center text-sm text-bloom-ink/40 hover:text-bloom-rose transition-colors"
                  >
                    ← Return to cart
                  </Link>
                </div>
              </form>

              {/* Security Note */}
              <div className="flex items-center gap-2 rounded-xl bg-bloom-rose/5 p-4 text-xs text-bloom-ink/60">
                <FiShield className="h-4 w-4 text-bloom-rose/60" />
                <span>Your information is secure and encrypted</span>
              </div>
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
                    <span className="font-medium text-bloom-ink">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-bloom-ink/60">Shipping</span>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                      Free
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-bloom-ink/60">Tax estimate</span>
                    <span className="text-bloom-ink/40">Calculated at next step</span>
                  </div>
                </div>

                {/* Total */}
                <div className="mt-4 rounded-xl bg-gradient-to-r from-bloom-rose/5 to-transparent p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-medium text-bloom-ink">Total</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-bloom-rose">
                        {formatCurrency(total)}
                      </span>
                      <p className="text-xs text-bloom-ink/40">Including all taxes</p>
                    </div>
                  </div>
                </div>

                {/* Delivery Estimate */}
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-bloom-rose/5 p-3 text-xs">
                  <FiTruck className="h-4 w-4 text-bloom-rose/60" />
                  <div>
                    <p className="font-medium text-bloom-ink">Estimated delivery</p>
                    <p className="text-bloom-ink/40">3-5 business days</p>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-4 flex items-center justify-center gap-3 text-xs text-bloom-ink/30">
                  <span>🔒 Secure</span>
                  <span className="h-1 w-1 rounded-full bg-bloom-rose/30" />
                  <span>💳 Payments</span>
                  <span className="h-1 w-1 rounded-full bg-bloom-rose/30" />
                  <span>🚚 Fast delivery</span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}