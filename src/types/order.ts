export type PurchasedItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type UserOrder = {
  id: string;
  userId: string;
  items: PurchasedItem[];
  total: number;
  status: "pending";
  createdAt: string;
};
