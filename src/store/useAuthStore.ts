import { create } from "zustand";

import { decodeFakeJwt } from "@/lib/authToken";
import type { AuthUser } from "@/types/auth";
import { readStorage, removeStorage, writeStorage } from "@/utils/storage";

const AUTH_TOKEN_KEY = "auth_token";
const AUTH_USER_KEY = "auth_user";

type AuthStore = {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
  loadUserFromStorage: () => void;
  updateProfile: (payload: Partial<Pick<AuthUser, "name" | "email" | "phone" | "address" | "avatar">>) => void;
};

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  login: (user, token) => {
    writeStorage(AUTH_TOKEN_KEY, token);
    writeStorage(AUTH_USER_KEY, user);

    set({
      user,
      token,
      isAuthenticated: true
    });
  },
  logout: () => {
    removeStorage(AUTH_TOKEN_KEY);
    removeStorage(AUTH_USER_KEY);

    set({
      user: null,
      token: null,
      isAuthenticated: false
    });
  },
  loadUserFromStorage: () => {
    const token = readStorage<string | null>(AUTH_TOKEN_KEY, null);
    const storedUser = readStorage<AuthUser | null>(AUTH_USER_KEY, null);

    if (!token || !storedUser) {
      set({ user: null, token: null, isAuthenticated: false });
      return;
    }

    const decoded = decodeFakeJwt(token);
    if (!decoded) {
      removeStorage(AUTH_TOKEN_KEY);
      removeStorage(AUTH_USER_KEY);
      set({ user: null, token: null, isAuthenticated: false });
      return;
    }

    set({
      user: storedUser,
      token,
      isAuthenticated: true
    });
  },
  updateProfile: (payload) => {
    const currentUser = get().user;
    if (!currentUser) {
      return;
    }

    const updatedUser: AuthUser = {
      ...currentUser,
      ...payload
    };

    writeStorage(AUTH_USER_KEY, updatedUser);
    set({ user: updatedUser });

    const users = readStorage<Array<AuthUser & { password?: string }>>("auth_users", []);
    const updatedUsers = users.map((user) =>
      user.id === updatedUser.id
        ? {
            ...user,
            ...updatedUser
          }
        : user
    );
    writeStorage<Array<AuthUser & { password?: string }>>("auth_users", updatedUsers);
  }
}));
