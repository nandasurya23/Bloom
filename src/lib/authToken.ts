import type { AuthUser } from "@/types/auth";

export function generateFakeJwt(user: Pick<AuthUser, "id" | "email">): string {
  return btoa(
    JSON.stringify({
      id: user.id,
      email: user.email,
      type: "fake-jwt"
    })
  );
}

export function decodeFakeJwt(token: string): { id: string; email: string } | null {
  try {
    const parsed = JSON.parse(atob(token)) as { id: string; email: string };
    if (!parsed.id || !parsed.email) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}
