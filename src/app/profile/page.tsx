"use client";

import { useRouter } from "next/navigation";
import type { JSX } from "react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiLogOut,
  FiShoppingBag,
  FiPackage,
  FiEdit3,
  FiSave,
  FiChevronRight,
  FiShield,
  FiCamera
} from "react-icons/fi";

import { OrderCard } from "@/components/order/OrderCard";
import { PurchaseList } from "@/components/order/PurchaseList";
import { AvatarUpload } from "@/components/profile/AvatarUpload";
import { fetchUserOrders, fetchUserPurchases } from "@/lib/mockApi";
import { profileSchema, type ProfileInput } from "@/schemas/profileSchema";
import { useAuthStore } from "@/store/useAuthStore";

export default function ProfilePage(): JSX.Element {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const loadUserFromStorage = useAuthStore((state) => state.loadUserFromStorage);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const logout = useAuthStore((state) => state.logout);
  const [bootstrapped, setBootstrapped] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "purchases">("profile");

  useEffect(() => {
    loadUserFromStorage();
    setBootstrapped(true);
  }, [loadUserFromStorage]);

  useEffect(() => {
    if (bootstrapped && !isAuthenticated) {
      router.push("/login");
    }
  }, [bootstrapped, isAuthenticated, router]);

  const defaultValues = useMemo<ProfileInput>(
    () => ({
      name: user?.name ?? "",
      email: user?.email ?? "",
      phone: user?.phone ?? "",
      address: user?.address ?? ""
    }),
    [user]
  );

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<ProfileInput>({
    values: defaultValues
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const userId = user?.id ?? "";

  const ordersQuery = useQuery({
    queryKey: ["orders", userId],
    queryFn: () => fetchUserOrders(userId),
    enabled: Boolean(userId)
  });

  const purchasesQuery = useQuery({
    queryKey: ["purchases", userId],
    queryFn: () => fetchUserPurchases(userId),
    enabled: Boolean(userId)
  });

  const onSubmit = (values: ProfileInput): void => {
    const parsed = profileSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      if (fieldErrors.name?.[0]) {
        setError("name", { message: fieldErrors.name[0] });
      }
      if (fieldErrors.email?.[0]) {
        setError("email", { message: fieldErrors.email[0] });
      }
      return;
    }

    updateProfile(values);
  };

  if (!bootstrapped || !isAuthenticated || !user) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-white to-bloom-rose/5">
        <div className="mx-auto w-full max-w-4xl px-4 py-16">
          <div className="flex flex-col items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-bloom-rose/30 border-t-bloom-rose" />
            <p className="mt-4 text-sm text-bloom-ink/60">Loading your profile...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-bloom-rose/5">
      <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-bloom-ink sm:text-3xl">Profile</h1>

          <button
            type="button"
            onClick={logout}
            className="flex items-center gap-2 rounded-full border border-bloom-rose/30 bg-white px-4 py-2 text-sm text-bloom-ink transition-colors hover:bg-bloom-rose/5"
          >
            <FiLogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>

        {/* Profile Header with Avatar */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-[auto_1fr] sm:gap-8">
          {/* Avatar - Full width on mobile, auto on desktop */}
          <div className="flex justify-center sm:justify-start">
            <AvatarUpload
              currentAvatar={user.avatar}
              onSave={(base64) => {
                updateProfile({ avatar: base64 });
              }}
            />
          </div>

          {/* User Info - Takes remaining space */}
          <div className="space-y-2 text-center sm:text-left">
            <div>
              <h2 className="text-xl font-semibold text-bloom-ink sm:text-2xl">
                {user.name}
              </h2>
              <p className="text-sm text-bloom-ink/40 break-all">
                {user.email}
              </p>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 sm:justify-start">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <span className="text-xs text-bloom-ink/60">Active</span>
              </div>
              <div className="h-3 w-px bg-bloom-rose/20" />
              <div>
                <span className="text-xs text-bloom-ink/60">
                  Member since {new Date().getFullYear()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-4 flex gap-1 border-b border-bloom-rose/10">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === "profile"
                ? "text-bloom-rose border-b-2 border-bloom-rose"
                : "text-bloom-ink/40 hover:text-bloom-ink/60"
              }`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === "orders"
                ? "text-bloom-rose border-b-2 border-bloom-rose"
                : "text-bloom-ink/40 hover:text-bloom-ink/60"
              }`}
          >
            Orders
          </button>
          <button
            onClick={() => setActiveTab("purchases")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === "purchases"
                ? "text-bloom-rose border-b-2 border-bloom-rose"
                : "text-bloom-ink/40 hover:text-bloom-ink/60"
              }`}
          >
            Purchases
          </button>
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === "profile" && (
            <div className="rounded-xl border border-bloom-rose/20 bg-white p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-bloom-ink/60">
                      Full Name
                    </label>
                    <input
                      {...register("name")}
                      placeholder="Your name"
                      className={`
                        w-full rounded-lg border bg-white px-3 py-2 text-sm
                        outline-none transition-colors
                        focus:border-bloom-rose focus:ring-1 focus:ring-bloom-rose/20
                        ${errors.name ? 'border-red-300' : 'border-bloom-rose/30'}
                      `}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-bloom-ink/60">
                      Email
                    </label>
                    <input
                      {...register("email")}
                      placeholder="Your email"
                      className={`
                        w-full rounded-lg border bg-white px-3 py-2 text-sm
                        outline-none transition-colors
                        focus:border-bloom-rose focus:ring-1 focus:ring-bloom-rose/20
                        ${errors.email ? 'border-red-300' : 'border-bloom-rose/30'}
                      `}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-bloom-ink/60">
                      Phone
                    </label>
                    <input
                      {...register("phone")}
                      placeholder="Your phone number"
                      className="w-full rounded-lg border border-bloom-rose/30 bg-white px-3 py-2 text-sm outline-none focus:border-bloom-rose focus:ring-1 focus:ring-bloom-rose/20"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-medium text-bloom-ink/60">
                      Address
                    </label>
                    <input
                      {...register("address")}
                      placeholder="Your address"
                      className="w-full rounded-lg border border-bloom-rose/30 bg-white px-3 py-2 text-sm outline-none focus:border-bloom-rose focus:ring-1 focus:ring-bloom-rose/20"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 rounded-lg bg-bloom-rose px-4 py-2 text-sm text-white transition-colors hover:bg-bloom-rose/90 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-3">
              {ordersQuery.isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-bloom-rose/30 border-t-bloom-rose" />
                </div>
              ) : ordersQuery.data?.length === 0 ? (
                <div className="rounded-xl border border-bloom-rose/20 bg-white p-8 text-center">
                  <FiShoppingBag className="mx-auto h-8 w-8 text-bloom-rose/30" />
                  <p className="mt-2 text-sm text-bloom-ink/60">No orders yet</p>
                </div>
              ) : (
                ordersQuery.data?.map((order) => <OrderCard key={order.id} order={order} />)
              )}
            </div>
          )}

          {activeTab === "purchases" && (
            <div className="rounded-xl border border-bloom-rose/20 bg-white p-6">
              {purchasesQuery.isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-bloom-rose/30 border-t-bloom-rose" />
                </div>
              ) : (
                <PurchaseList items={purchasesQuery.data ?? []} />
              )}
            </div>
          )}
        </div>

        {/* Security Note */}
        <div className="mt-4 text-xs text-bloom-ink/40">
          <FiShield className="inline h-3 w-3 mr-1" />
          Your information is secure
        </div>
      </div>
    </main>
  );
}