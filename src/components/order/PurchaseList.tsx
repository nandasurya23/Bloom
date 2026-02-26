import type { JSX } from "react";

import { formatCurrency } from "@/lib/formatCurrency";
import type { PurchasedItem } from "@/types/order";

type PurchaseListProps = {
  items: PurchasedItem[];
};

export function PurchaseList({ items }: PurchaseListProps): JSX.Element {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-bloom-rose/20 bg-white/50 px-6 py-12 text-center">
        <div className="rounded-full bg-bloom-rose/10 p-4">
          <svg 
            className="h-8 w-8 text-bloom-rose/40" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" 
            />
          </svg>
        </div>
        <h4 className="mt-4 text-sm font-medium text-bloom-ink">No purchases yet</h4>
        <p className="mt-1 text-xs text-bloom-ink/40">
          Your purchased items will appear here
        </p>
      </div>
    );
  }

  // Calculate totals
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="space-y-4">
      {/* Summary Header */}
      <div className="flex items-center justify-between rounded-xl bg-gradient-to-r from-bloom-rose/5 to-transparent px-4 py-2">
        <div className="flex items-center gap-2 text-xs text-bloom-ink/50">
          <span className="font-medium text-bloom-ink">{items.length}</span> items
          <span className="mx-1.5 h-1 w-1 rounded-full bg-bloom-rose/30" />
          <span className="font-medium text-bloom-ink">{totalItems}</span> total quantity
        </div>
        <div className="text-xs text-bloom-ink/40">
          Subtotal: <span className="font-medium text-bloom-rose">{formatCurrency(subtotal)}</span>
        </div>
      </div>

      {/* Purchase Items List */}
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li 
            key={`${item.id}-${index}`}
            className="group relative overflow-hidden rounded-xl border border-bloom-rose/20 bg-white p-4 shadow-sm transition-all hover:border-bloom-rose/40 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              {/* Item Details */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-medium text-bloom-ink">{item.name}</h4>
                  {item.quantity > 1 && (
                    <span className="rounded-full bg-bloom-rose/10 px-2 py-0.5 text-xs font-medium text-bloom-rose">
                      x{item.quantity}
                    </span>
                  )}
                </div>
                
                {/* Item Metadata */}
                <div className="mt-1 flex items-center gap-3 text-xs text-bloom-ink/40">
                  <span>Unit price: {formatCurrency(item.price)}</span>
                </div>
              </div>

              {/* Price */}
              <div className="text-right">
                <p className="text-sm font-semibold text-bloom-ink">
                  {formatCurrency(item.price * item.quantity)}
                </p>
                {item.quantity > 1 && (
                  <p className="text-xs text-bloom-ink/30">
                    ({formatCurrency(item.price)} each)
                  </p>
                )}
              </div>
            </div>

            {/* Quick Action (optional - appears on hover) */}
            <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
              <button className="rounded-full bg-white p-1 shadow-sm hover:bg-bloom-rose/5">
                <svg className="h-3.5 w-3.5 text-bloom-ink/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Footer Note */}
      <div className="flex items-center justify-end gap-1 text-right text-xs text-bloom-ink/30">
        <span>All prices include tax</span>
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>
  );
}