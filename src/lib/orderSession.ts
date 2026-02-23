import type { CheckoutFormValues, OrderReceipt } from "@/types/checkout";

const CHECKOUT_DATA_KEY = "bloom-checkout-data";
const ORDER_RECEIPT_KEY = "bloom-order-receipt";

export function saveCheckoutData(payload: CheckoutFormValues): void {
  try {
    sessionStorage.setItem(CHECKOUT_DATA_KEY, JSON.stringify(payload));
  } catch {
    return;
  }
}

export function readCheckoutData(): CheckoutFormValues | null {
  let raw: string | null = null;

  try {
    raw = sessionStorage.getItem(CHECKOUT_DATA_KEY);
  } catch {
    return null;
  }

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as CheckoutFormValues;
  } catch {
    return null;
  }
}

export function saveOrderReceipt(payload: OrderReceipt): void {
  try {
    sessionStorage.setItem(ORDER_RECEIPT_KEY, JSON.stringify(payload));
  } catch {
    return;
  }
}

export function readOrderReceipt(): OrderReceipt | null {
  let raw: string | null = null;

  try {
    raw = sessionStorage.getItem(ORDER_RECEIPT_KEY);
  } catch {
    return null;
  }

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as OrderReceipt;
  } catch {
    return null;
  }
}

export function clearCheckoutData(): void {
  try {
    sessionStorage.removeItem(CHECKOUT_DATA_KEY);
  } catch {
    return;
  }
}
