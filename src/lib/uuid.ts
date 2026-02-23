export function generateOrderId(): string {
  return crypto.randomUUID();
}
