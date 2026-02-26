import type { JSX } from "react";

import { formatCurrency } from "@/lib/formatCurrency";
import type { UserOrder } from "@/types/order";

type OrderCardProps = {
  order: UserOrder;
};

export function OrderCard({ order }: OrderCardProps): JSX.Element {
  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case "completed":
      case "delivered":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "processing":
      case "shipped":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "cancelled":
        return "bg-rose-100 text-rose-700 border-rose-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-bloom-rose/20 bg-white shadow-sm transition-all hover:shadow-md">
      {/* Header */}
      <div className="border-b border-bloom-rose/10 bg-gradient-to-r from-bloom-rose/5 to-transparent p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-sm font-semibold text-bloom-ink">Order #{order.id}</h3>
            <p className="mt-0.5 text-xs text-bloom-ink/50">
              Ordered on {new Date(order.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </p>
          </div>
          
          {/* Status Badge */}
          <span className={`
            inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium capitalize
            ${getStatusColor(order.status)}
          `}>
            {order.status}
          </span>
        </div>
      </div>

      {/* Items List */}
      <div className="p-4">
        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-bloom-ink/40">
          Items ({order.items.length})
        </p>
        <ul className="space-y-2">
          {order.items.map((item) => (
            <li 
              key={`${order.id}-${item.id}`} 
              className="flex items-center justify-between text-sm group-hover:bg-bloom-rose/5 -mx-1 px-1 py-0.5 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-bloom-rose/10 text-xs font-medium text-bloom-rose">
                  {item.quantity}
                </span>
                <span className="text-bloom-ink/80">{item.name}</span>
              </div>
              <span className="font-medium text-bloom-ink">
                {formatCurrency(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer with Total */}
      <div className="border-t border-bloom-rose/10 bg-bloom-rose/5 p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-bloom-ink/50">Total Amount</p>
            <p className="text-sm text-bloom-ink/60">Including taxes & shipping</p>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-bloom-rose">
              {formatCurrency(order.total)}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons (Optional - bisa ditambahkan nanti) */}
      <div className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100">
        <button className="rounded-full bg-white p-1.5 shadow-md hover:bg-bloom-rose/5">
          <svg className="h-4 w-4 text-bloom-ink/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
    </article>
  );
}
