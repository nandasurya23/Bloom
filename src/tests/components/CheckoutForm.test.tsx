import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CheckoutPage from "@/app/checkout/page";

const mockPush = jest.fn();
const mockSaveCheckoutData = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush
  })
}));

jest.mock("@/lib/orderSession", () => ({
  saveCheckoutData: (payload: unknown) => mockSaveCheckoutData(payload)
}));

jest.mock("@/store/useCartStore", () => ({
  useCartStore: (selector: (state: {
    items: Array<{ productId: string; name: string; quantity: number; unitPrice: number }>;
    subtotal: number;
    total: number;
  }) => unknown) =>
    selector({
      items: [{ productId: "1", name: "Rose", quantity: 1, unitPrice: 150000 }],
      subtotal: 150000,
      total: 150000
    })
}));

describe("Checkout form", () => {
  beforeEach(() => {
    mockPush.mockClear();
    mockSaveCheckoutData.mockClear();
  });

  it("shows required validation errors", async () => {
    const user = userEvent.setup();
    render(<CheckoutPage />);

    await user.click(screen.getByRole("button", { name: /continue to payment/i }));

    expect(await screen.findByText(/full name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  });

  it("shows invalid email error", async () => {
    const user = userEvent.setup();
    render(<CheckoutPage />);

    await user.type(screen.getByLabelText(/email/i), "invalid-email");
    await user.tab();

    expect(await screen.findByText(/enter a valid email address/i)).toBeInTheDocument();
  });

  it("submits valid form and navigates", async () => {
    const user = userEvent.setup();
    render(<CheckoutPage />);

    await user.type(screen.getByLabelText(/full name/i), "Nanda Surya");
    await user.type(screen.getByLabelText(/email/i), "nanda@example.com");
    await user.type(screen.getByLabelText(/phone/i), "+628123456789");
    await user.type(screen.getByLabelText(/address line 1/i), "Jl. Mawar No. 10, Jakarta");
    await user.type(screen.getByLabelText(/city/i), "Jakarta");
    await user.type(screen.getByLabelText(/postal code/i), "12345");

    await user.click(screen.getByRole("button", { name: /continue to payment/i }));

    await waitFor(() => {
      expect(mockSaveCheckoutData).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith("/payment");
    });
  });
});
