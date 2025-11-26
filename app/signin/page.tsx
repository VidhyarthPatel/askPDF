"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Github, Facebook, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";

const variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const USE_NEXTAUTH = true;

  async function handleCredentialsLogin(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Both email and password are required.");
      return;
    }

    try {
      setLoading(true);
      if (USE_NEXTAUTH) {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (res?.error) {
          throw new Error("Invalid email or password");
        }

        window.location.href = "/chat";
      } else {
        // Custom API implementation
      }
    } catch (err: any) {
      setError(err?.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function oauth(provider: "google" | "facebook" | "github") {
    setError(null);
    try {
      setLoading(true);
      await signIn(provider, { callbackUrl: "/chat" });
    } catch (err: any) {
      setError(err?.message ?? "OAuth failed. Try another button?");
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      {/* Subtle blobs - contained within viewport */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-4 top-4 h-32 w-32 rounded-full bg-blue-200/30 blur-2xl sm:h-40 sm:w-40"
        animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.5, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed bottom-4 right-4 h-32 w-32 rounded-full bg-green-200/30 blur-2xl sm:h-40 sm:w-40"
        animate={{ scale: [1.04, 1, 1.04], opacity: [0.4, 0.3, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="w-full max-w-md">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          className="rounded-2xl border border-gray-200 bg-white/80 p-4 shadow-sm backdrop-blur sm:p-6"
        >
          <div className="mb-6 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-sm font-medium text-gray-700">
              🪪 Sign in to{" "}
              <span className="font-bold">
                ask<span className="text-[#3a00a5]">PDF</span>
              </span>
            </span>
            <h1 className="mt-4 text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
              Welcome back, brave soul
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Authentication may be faster than the app. Enjoy it while it lasts.
            </p>
          </div>

          {/* OAuth buttons */}
          <div className="space-y-3">
            <button
              onClick={() => oauth("google")}
              className="cursor-pointer flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 transition-colors hover:border-gray-400"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="h-5 w-5"
              />
              <span className="text-sm sm:text-base">Continue with Google</span>
            </button>
            <button
              onClick={() => oauth("facebook")}
              className="cursor-pointer flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 transition-colors hover:border-gray-400"
            >
              <Facebook className="h-5 w-5" />
              <span className="text-sm sm:text-base">Continue with Facebook</span>
            </button>
            <button
              onClick={() => oauth("github")}
              className="cursor-pointer flex w-full items-center justify-center gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-800 transition-colors hover:border-gray-400"
            >
              <Github className="h-5 w-5" />
              <span className="cursor-pointer text-sm sm:text-base">Continue with GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs uppercase tracking-wider text-gray-400">or</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Email / Password */}
          <form onSubmit={handleCredentialsLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@patience.club"
                  className="w-full rounded-xl border border-gray-300 bg-white px-10 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#3a00a5] focus:outline-none focus:ring-2 focus:ring-[#3a00a5]/20"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-gray-300 bg-white px-10 py-3 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#3a00a5] focus:outline-none focus:ring-2 focus:ring-[#3a00a5]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-500 hover:bg-gray-100"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#3a00a5] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2d0080] disabled:opacity-70"
            >
              <span className="inline-flex items-center gap-2">
                {loading && (
                  <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
                )}
                Sign in with Email
              </span>
            </button>
          </form>

          {/* Sign up link */}
          <p className="mt-4 text-center text-xs text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="font-semibold text-[#3a00a5] hover:underline">
              Sign up
            </a>
          </p>

          {/* Tiny footer */}
          <p className="mt-4 text-center text-xs text-gray-500">
            By continuing, you agree to our painfully slow{" "}
            <a className="underline hover:text-[#3a00a5]" href="#">
              Terms
            </a>{" "}
            and{" "}
            <a className="underline hover:text-[#3a00a5]" href="#">
              Privacy
            </a>
            .
          </p>
        </motion.div>
      </div>
    </div>
  );
}