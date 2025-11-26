"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Github, Facebook, Mail, Lock, Eye, EyeOff, CheckCircle2, XCircle, User } from "lucide-react";
import { signIn } from "next-auth/react";

const variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function SignUp() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const strength = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score; // 0-5
  }, [password]);

  const strengthLabel = ["Very weak", "Weak", "So-so", "Decent", "Strong", "Glorious"][strength];

  async function handleEmailSignup(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email) return setError("Email is required.");
    if (strength < 3) return setError("Please use a stronger password (8+ chars with mix of cases & numbers).");
    if (!agree) return setError("You must accept the Terms & Privacy to continue.");

    try {
      setLoading(true);
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.message || "Sign up failed. Try another email?");
      }
      setSuccess("Account created! Signing you in...");

      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.error) {
        throw new Error(signInResult.error);
      }

      window.location.href = "/chat";
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
              🧾 Create your{" "}
              <span className="font-bold">
                ask<span className="text-[#3a00a5]">PDF</span>
              </span>
            </span>
            <h1 className="mt-4 text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
              Welcome! New patience unlocked
            </h1>
            <p className="mt-1 text-sm text-gray-600">Sign up now — the app will be slow later.</p>
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
              <span className="text-sm sm:text-base">Continue with GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs uppercase tracking-wider text-gray-400">or email</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Email Sign Up */}
          <form onSubmit={handleEmailSignup} className="space-y-4">
            <div>
              <label htmlFor="username" className="mb-1 block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input id="username" placeholder="Username" className="w-full rounded-xl border border-gray-300 bg-white px-10 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#3a00a5] focus:outline-none focus:ring-2 focus:ring-[#3a00a5]/20" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
            </div>

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
                  required
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
                  required
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
              {/* Strength meter */}
              {password && (
                <div className="mt-2">
                  <div className="h-1.5 w-full rounded-full bg-gray-200">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${strength <= 1
                        ? "bg-red-400"
                        : strength === 2
                          ? "bg-yellow-400"
                          : strength === 3
                            ? "bg-amber-500"
                            : strength === 4
                              ? "bg-green-500"
                              : "bg-emerald-600"
                        }`}
                      style={{ width: `${(strength / 5) * 100}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">{strengthLabel}</p>
                </div>
              )}
            </div>

            <label className="flex items-start gap-3 text-xs text-gray-600">
              <input
                type="checkbox"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-0.5 h-3.5 w-3.5 rounded border-gray-300 text-[#3a00a5] focus:ring-[#3a00a5]"
              />
              <span>
                I agree to the{" "}
                <a className="underline hover:text-[#3a00a5]" href="#">
                  Terms
                </a>{" "}
                and{" "}
                <a className="underline hover:text-[#3a00a5]" href="#">
                  Privacy
                </a>
                . We promise to send emails at leisurely speeds.
              </span>
            </label>

            {error && (
              <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                <XCircle className="h-3.5 w-3.5" /> {error}
              </div>
            )}
            {success && (
              <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" /> {success}
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
                Create account
              </span>
            </button>

            <p className="text-center text-xs text-gray-600">
              Already have an account?{" "}
              <a href="/signin" className="font-semibold text-[#3a00a5] hover:underline">
                Sign in
              </a>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}