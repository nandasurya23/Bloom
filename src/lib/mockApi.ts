import type { CartItem } from "@/types/cart";
import type { PurchasedItem, UserOrder } from "@/types/order";
import { generateId } from "@/utils/generateId";
import { readStorage, writeStorage } from "@/utils/storage";

const ORDERS_KEY = "user_orders";
const PURCHASES_KEY = "user_purchases";
const API_DELAY_MS = 500;

function toPurchasedItems(items: CartItem[]): PurchasedItem[] {
  return items.map((item) => ({
    id: item.productId,
    name: item.name,
    price: item.unitPrice,
    quantity: item.quantity,
    image: item.imageUrl
  }));
}

export async function fetchUserOrders(userId: string): Promise<UserOrder[]> {
  await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), API_DELAY_MS);
  });

  const orders = readStorage<UserOrder[]>(ORDERS_KEY, []);
  return orders.filter((order) => order.userId === userId);
}

export async function fetchUserPurchases(userId: string): Promise<PurchasedItem[]> {
  await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), API_DELAY_MS);
  });

  const purchases = readStorage<Record<string, PurchasedItem[]>>(PURCHASES_KEY, {});
  return purchases[userId] ?? [];
}

export async function createCheckoutOrder(input: {
  userId: string;
  items: CartItem[];
  total: number;
}): Promise<UserOrder> {
  await new Promise<void>((resolve) => {
    setTimeout(() => resolve(), API_DELAY_MS);
  });

  const order: UserOrder = {
    id: generateId("order"),
    userId: input.userId,
    items: toPurchasedItems(input.items),
    total: input.total,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  const allOrders = readStorage<UserOrder[]>(ORDERS_KEY, []);
  writeStorage<UserOrder[]>(ORDERS_KEY, [order, ...allOrders]);

  const allPurchases = readStorage<Record<string, PurchasedItem[]>>(PURCHASES_KEY, {});
  const userPurchases = allPurchases[input.userId] ?? [];
  allPurchases[input.userId] = [...toPurchasedItems(input.items), ...userPurchases];
  writeStorage<Record<string, PurchasedItem[]>>(PURCHASES_KEY, allPurchases);

  return order;
}
