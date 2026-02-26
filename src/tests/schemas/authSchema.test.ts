import { loginSchema, registerSchema } from "@/schemas/authSchema";

describe("authSchema", () => {
  it("validates login payload", () => {
    const result = loginSchema.safeParse({
      email: "user@example.com",
      password: "secret12"
    });

    expect(result.success).toBe(true);
  });

  it("rejects invalid login payload", () => {
    const result = loginSchema.safeParse({
      email: "invalid-email",
      password: "123"
    });

    expect(result.success).toBe(false);
  });

  it("validates register password confirmation", () => {
    const result = registerSchema.safeParse({
      name: "Nanda",
      email: "nanda@example.com",
      password: "secret12",
      confirmPassword: "secret12"
    });

    expect(result.success).toBe(true);
  });

  it("rejects mismatched register password confirmation", () => {
    const result = registerSchema.safeParse({
      name: "Nanda",
      email: "nanda@example.com",
      password: "secret12",
      confirmPassword: "secret13"
    });

    expect(result.success).toBe(false);
  });
});
