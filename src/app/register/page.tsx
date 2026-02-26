"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { JSX } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiLogIn, FiArrowRight } from "react-icons/fi";

import { AuthFormCard } from "@/components/auth/AuthFormCard";
import { generateFakeJwt } from "@/lib/authToken";
import { registerSchema, type RegisterInput } from "@/schemas/authSchema";
import { useAuthStore } from "@/store/useAuthStore";
import type { AuthUser } from "@/types/auth";
import { generateId } from "@/utils/generateId";
import { readStorage, writeStorage } from "@/utils/storage";

type StoredUser = AuthUser & { password: string };

export default function RegisterPage(): JSX.Element {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [registerError, setRegisterError] = useState<string>("");

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<RegisterInput>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    }
  });

  const onSubmit = (values: RegisterInput): void => {
    const parsed = registerSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      if (fieldErrors.name?.[0]) {
        setError("name", { message: fieldErrors.name[0] });
      }
      if (fieldErrors.email?.[0]) {
        setError("email", { message: fieldErrors.email[0] });
      }
      if (fieldErrors.password?.[0]) {
        setError("password", { message: fieldErrors.password[0] });
      }
      if (fieldErrors.confirmPassword?.[0]) {
        setError("confirmPassword", { message: fieldErrors.confirmPassword[0] });
      }
      return;
    }

    const users = readStorage<StoredUser[]>("auth_users", []);
    const exists = users.some((user) => user.email === values.email);

    if (exists) {
      setRegisterError("Email already registered");
      return;
    }

    const newUser: StoredUser = {
      id: generateId("user"),
      name: values.name,
      email: values.email,
      password: values.password
    };

    writeStorage<StoredUser[]>("auth_users", [newUser, ...users]);

    const token = generateFakeJwt({ id: newUser.id, email: newUser.email });
    login(
      {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      },
      token
    );

    router.push("/");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-bloom-rose/5 to-bloom-blush flex items-center justify-center p-4">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-bloom-rose/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-bloom-blush blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative"
      >
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
            className="inline-flex items-center justify-center mb-4"
          >
            <div className="rounded-2xl bg-gradient-to-br from-bloom-rose to-rose-400 p-3 shadow-lg shadow-bloom-rose/30">
              <FiUser className="h-8 w-8 text-white" />
            </div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-light text-bloom-ink"
          >
            Create <span className="font-semibold text-bloom-rose">Account</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-sm text-bloom-ink/50 mt-1"
          >
            Join us to start your floral journey
          </motion.p>
        </div>

        <AuthFormCard title="Register" subtitle="Create your account to track orders and purchases.">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-bloom-ink/60">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-bloom-ink/30">
                  <FiUser className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  placeholder="John Doe"
                  {...register("name")}
                  className={`
                    w-full rounded-xl border bg-white/90 pl-10 pr-4 py-3 text-sm text-bloom-ink
                    outline-none transition-all placeholder:text-bloom-ink/30
                    focus:border-bloom-rose focus:ring-2 focus:ring-bloom-rose/20
                    ${errors.name ? 'border-red-300 bg-red-50/50' : 'border-bloom-rose/30'}
                  `}
                />
              </div>
              {errors.name && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-500"
                >
                  {errors.name.message}
                </motion.p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-bloom-ink/60">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-bloom-ink/30">
                  <FiMail className="h-4 w-4" />
                </div>
                <input
                  type="email"
                  placeholder="your@email.com"
                  {...register("email")}
                  className={`
                    w-full rounded-xl border bg-white/90 pl-10 pr-4 py-3 text-sm text-bloom-ink
                    outline-none transition-all placeholder:text-bloom-ink/30
                    focus:border-bloom-rose focus:ring-2 focus:ring-bloom-rose/20
                    ${errors.email ? 'border-red-300 bg-red-50/50' : 'border-bloom-rose/30'}
                  `}
                />
              </div>
              {errors.email && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-500"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-bloom-ink/60">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-bloom-ink/30">
                  <FiLock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className={`
                    w-full rounded-xl border bg-white/90 pl-10 pr-4 py-3 text-sm text-bloom-ink
                    outline-none transition-all placeholder:text-bloom-ink/30
                    focus:border-bloom-rose focus:ring-2 focus:ring-bloom-rose/20
                    ${errors.password ? 'border-red-300 bg-red-50/50' : 'border-bloom-rose/30'}
                  `}
                />
              </div>
              {errors.password && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-500"
                >
                  {errors.password.message}
                </motion.p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-bloom-ink/60">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-bloom-ink/30">
                  <FiLock className="h-4 w-4" />
                </div>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                  className={`
                    w-full rounded-xl border bg-white/90 pl-10 pr-4 py-3 text-sm text-bloom-ink
                    outline-none transition-all placeholder:text-bloom-ink/30
                    focus:border-bloom-rose focus:ring-2 focus:ring-bloom-rose/20
                    ${errors.confirmPassword ? 'border-red-300 bg-red-50/50' : 'border-bloom-rose/30'}
                  `}
                />
              </div>
              {errors.confirmPassword && (
                <motion.p 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-500"
                >
                  {errors.confirmPassword.message}
                </motion.p>
              )}
            </div>

            {/* Password Requirements Hint */}
            <div className="text-xs text-bloom-ink/40 space-y-1">
              <p className="font-medium">Password must:</p>
              <ul className="list-disc list-inside pl-1">
                <li>Be at least 8 characters</li>
                <li>Include at least one uppercase letter</li>
                <li>Include at least one number</li>
              </ul>
            </div>

            {/* Error Message */}
            {registerError && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="overflow-hidden"
              >
                <div className="flex items-center gap-2 rounded-lg bg-red-50 p-3 text-xs text-red-600">
                  <span className="h-1 w-1 rounded-full bg-red-600" />
                  {registerError}
                </div>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-bloom-rose to-rose-400 px-4 py-3.5 text-sm font-medium text-white shadow-lg shadow-bloom-rose/30 transition-all hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full transition-transform group-hover:translate-y-0" />
              <span className="relative flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Creating account...
                  </>
                ) : (
                  <>
                    <FiLogIn className="h-4 w-4" />
                    Create Account
                  </>
                )}
              </span>
            </motion.button>

            {/* Login Link */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-bloom-rose/10" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white/80 px-2 text-bloom-ink/30 backdrop-blur-sm">
                  Already have an account?
                </span>
              </div>
            </div>

            <Link
              href="/login"
              className="group flex items-center justify-center gap-2 rounded-xl border border-bloom-rose/30 bg-white/80 px-4 py-3 text-sm font-medium text-bloom-ink transition-all hover:border-bloom-rose hover:bg-white hover:shadow-md"
            >
              Sign In
              <FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>

            {/* Terms Agreement */}
            <p className="text-center text-xs text-bloom-ink/30">
              By creating an account, you agree to our Terms and Privacy Policy
            </p>
          </form>
        </AuthFormCard>
      </motion.div>
    </main>
  );
}