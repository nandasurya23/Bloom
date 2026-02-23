"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { JSX } from "react";
import { FiChevronRight, FiMapPin } from "react-icons/fi";
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
    formState: { errors, isSubmitting }
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

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-10">
      <h1 className="flex items-center gap-2 text-3xl font-semibold text-bloom-ink">
        <FiMapPin className="text-bloom-ink/70" /> Checkout
      </h1>
      <p className="mt-2 text-sm text-bloom-ink/70">Fill in delivery details to continue securely.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 rounded-2xl border border-bloom-rose/50 bg-white p-5"
        >
          <div>
            <label htmlFor="fullName" className="mb-1 block text-sm text-bloom-ink">
              Full name
            </label>
            <input
              id="fullName"
              type="text"
              {...register("fullName", {
                required: "Full name is required",
                minLength: { value: 3, message: "Minimum 3 characters" }
              })}
              className="w-full rounded-md border border-bloom-rose/60 px-3 py-2 text-sm"
            />
            {errors.fullName ? <p className="mt-1 text-xs text-red-600">{errors.fullName.message}</p> : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm text-bloom-ink">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: { value: EMAIL_REGEX, message: "Enter a valid email address" }
                })}
                className="w-full rounded-md border border-bloom-rose/60 px-3 py-2 text-sm"
              />
              {errors.email ? <p className="mt-1 text-xs text-red-600">{errors.email.message}</p> : null}
            </div>
            <div>
              <label htmlFor="phone" className="mb-1 block text-sm text-bloom-ink">
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: { value: PHONE_REGEX, message: "Enter a valid phone number" }
                })}
                className="w-full rounded-md border border-bloom-rose/60 px-3 py-2 text-sm"
              />
              {errors.phone ? <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p> : null}
            </div>
          </div>

          <div>
            <label htmlFor="addressLine1" className="mb-1 block text-sm text-bloom-ink">
              Address line 1
            </label>
            <input
              id="addressLine1"
              type="text"
              {...register("addressLine1", {
                required: "Address is required",
                minLength: { value: 8, message: "Address is too short" }
              })}
              className="w-full rounded-md border border-bloom-rose/60 px-3 py-2 text-sm"
            />
            {errors.addressLine1 ? (
              <p className="mt-1 text-xs text-red-600">{errors.addressLine1.message}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="addressLine2" className="mb-1 block text-sm text-bloom-ink">
              Address line 2 (optional)
            </label>
            <input
              id="addressLine2"
              type="text"
              {...register("addressLine2")}
              className="w-full rounded-md border border-bloom-rose/60 px-3 py-2 text-sm"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="city" className="mb-1 block text-sm text-bloom-ink">
                City
              </label>
              <input
                id="city"
                type="text"
                {...register("city", {
                  required: "City is required",
                  minLength: { value: 2, message: "City name is too short" }
                })}
                className="w-full rounded-md border border-bloom-rose/60 px-3 py-2 text-sm"
              />
              {errors.city ? <p className="mt-1 text-xs text-red-600">{errors.city.message}</p> : null}
            </div>
            <div>
              <label htmlFor="postalCode" className="mb-1 block text-sm text-bloom-ink">
                Postal code
              </label>
              <input
                id="postalCode"
                type="text"
                {...register("postalCode", {
                  required: "Postal code is required",
                  pattern: { value: POSTAL_CODE_REGEX, message: "Use a valid 5-digit postal code" }
                })}
                className="w-full rounded-md border border-bloom-rose/60 px-3 py-2 text-sm"
              />
              {errors.postalCode ? <p className="mt-1 text-xs text-red-600">{errors.postalCode.message}</p> : null}
            </div>
          </div>

          <div>
            <label htmlFor="notes" className="mb-1 block text-sm text-bloom-ink">
              Notes (optional)
            </label>
            <textarea
              id="notes"
              rows={3}
              {...register("notes", {
                maxLength: { value: 200, message: "Max 200 characters" }
              })}
              className="w-full rounded-md border border-bloom-rose/60 px-3 py-2 text-sm"
            />
            {errors.notes ? <p className="mt-1 text-xs text-red-600">{errors.notes.message}</p> : null}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || items.length === 0}
            className="inline-flex items-center gap-2 rounded-full border border-bloom-rose/60 px-4 py-2 text-sm font-medium transition hover:bg-bloom-blush disabled:opacity-50"
          >
            Continue to payment <FiChevronRight />
          </button>

          {items.length === 0 ? (
            <p className="text-xs text-bloom-ink/70">
              Your cart is empty. Add products from <Link href="/shop" className="underline">Shop</Link>.
            </p>
          ) : null}
        </form>

        <aside className="rounded-2xl border border-bloom-rose/50 bg-white p-5">
          <h2 className="text-lg font-medium text-bloom-ink">Order Summary</h2>
          <ul className="mt-4 space-y-3">
            {items.map((item) => (
              <li key={item.productId} className="flex items-center justify-between text-sm">
                <span className="text-bloom-ink/80">
                  {item.name} x {item.quantity}
                </span>
                <span className="font-medium text-bloom-ink">
                  {formatCurrency(item.unitPrice * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-bloom-rose/40 pt-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-bloom-ink/70">Subtotal</span>
              <span className="text-bloom-ink">{formatCurrency(subtotal)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between font-medium">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
