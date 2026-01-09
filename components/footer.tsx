"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { Github, Twitter, Mail, Heart, Coffee } from "lucide-react";

const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const item: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

function Footer() {
    return (
        <footer className="relative bg-white border-t border-gray-100 overflow-hidden">
            {/* Floating blobs to match HeroSection vibe */}
            <motion.div
                aria-hidden
                className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-blue-200/40 blur-3xl"
                animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.7, 0.6] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                aria-hidden
                className="pointer-events-none absolute -right-20 -bottom-24 h-72 w-72 rounded-full bg-green-200/40 blur-3xl"
                animate={{ scale: [1.05, 1, 1.05], opacity: [0.6, 0.5, 0.6] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 md:px-12 py-16 sm:py-20"
            >
                {/* Top strip */}
                <motion.div
                    variants={item}
                    className="mb-12 flex flex-col items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white/70 p-4 sm:flex-row sm:p-5 shadow-sm"
                >
                    <div className="inline-flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">Proudly slow since</span>
                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-800">
                            v0.0.1
                        </span>
                    </div>
                    <div className="flex items-center gap-3">
                        <a
                            href="#pricing"
                            className="rounded-lg bg-[#3a00a5] px-4 py-2 text-white shadow-sm transition-colors hover:bg-[#2d0080]"
                        >
                            Start for Free
                        </a>
                        <a
                            href="#how-it-works"
                            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:border-gray-400"
                        >
                            How it Works
                        </a>
                    </div>
                </motion.div>

                {/* Main grid */}
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12">
                    {/* Brand column */}
                    <motion.div variants={item} className="lg:col-span-4">
                        <div className="mb-4 text-2xl font-extrabold tracking-tight text-gray-900">
                            ask<span className="text-[#3a00a5]">PDF</span>
                        </div>
                        <p className="max-w-sm text-gray-600">
                            A tiny tool that lets you talk to your PDFs. Built by one
                            developer, a stubborn free API, and a dangerously optimistic
                            caffeine budget.
                        </p>

                        {/* mini socials */}
                        <div className="mt-6 flex items-center gap-3">
                            <a
                                href="https://github.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-lg border border-gray-200 p-2 text-gray-600 transition-colors hover:border-gray-300 hover:text-gray-900"
                                aria-label="GitHub"
                            >
                                <Github className="h-5 w-5" />
                            </a>
                            <a
                                href="https://twitter.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-lg border border-gray-200 p-2 text-gray-600 transition-colors hover:border-gray-300 hover:text-gray-900"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a
                                href="mailto:support@askpdf.example"
                                className="rounded-lg border border-gray-200 p-2 text-gray-600 transition-colors hover:border-gray-300 hover:text-gray-900"
                                aria-label="Email"
                            >
                                <Mail className="h-5 w-5" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Links */}
                    <motion.div variants={item} className="lg:col-span-2">
                        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-800">
                            Product
                        </h4>
                        <ul className="space-y-3 text-gray-600">
                            <li>
                                <a href="#features" className="hover:text-[#3a00a5]">Features</a>
                            </li>
                            <li>
                                <a href="#pricing" className="hover:text-[#3a00a5]">Pricing</a>
                            </li>
                            <li>
                                <a href="#how-it-works" className="hover:text-[#3a00a5]">How it Works</a>
                            </li>
                            <li>
                                <a href="#faq" className="hover:text-[#3a00a5]">FAQ</a>
                            </li>
                        </ul>
                    </motion.div>

                    <motion.div variants={item} className="lg:col-span-2">
                        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-800">
                            Company
                        </h4>
                        <ul className="space-y-3 text-gray-600">
                            <li>
                                <a href="#" className="hover:text-[#3a00a5]">About</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#3a00a5]">Changelog</a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-[#3a00a5]">Roadmap*</a>
                            </li>
                            <li className="text-xs text-gray-400">*drawn on a napkin</li>
                        </ul>
                    </motion.div>

                    {/* Newsletter */}
                    <motion.div variants={item} className="lg:col-span-4">
                        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-800">
                            Join the Waiting Room
                        </h4>
                        <p className="mb-4 text-gray-600">
                            Monthly updates. No spam. Occasional existential crisis.
                        </p>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                alert("Subscribed! We'll email you at the speed of AskPDF.");
                            }}
                            className="flex w-full items-center gap-3"
                        >
                            <input
                                type="email"
                                required
                                placeholder="you@patience.club"
                                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[#3a00a5] focus:outline-none focus:ring-2 focus:ring-[#3a00a5]/20"
                            />
                            <button
                                type="submit"
                                className="whitespace-nowrap rounded-xl bg-[#3a00a5] px-5 py-3 font-semibold text-white transition-colors hover:bg-[#2d0080]"
                            >
                                Subscribe
                            </button>
                        </form>
                        <p className="mt-2 text-xs text-gray-500">
                            By subscribing, you agree to receive emails delivered at
                            scientifically slow intervals.
                        </p>
                    </motion.div>
                </div>

                {/* Bottom bar */}
                <motion.div
                    variants={item}
                    className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 text-sm text-gray-600 sm:flex-row"
                >
                    <p className="flex items-center gap-1">
                        © {new Date().getFullYear()} AskPDF. Made with
                        <Heart className="mx-1 h-4 w-4 text-pink-500" /> and
                        <Coffee className="mx-1 h-4 w-4 text-amber-600" /> in a queue.
                    </p>
                    <div className="flex items-center gap-4">
                        <a href="#" className="hover:text-[#3a00a5]">Terms</a>
                        <span className="text-gray-300">•</span>
                        <a href="#" className="hover:text-[#3a00a5]">Privacy</a>
                        <span className="text-gray-300">•</span>
                        <a href="#" className="hover:text-[#3a00a5]">Contact</a>
                    </div>
                </motion.div>
            </motion.div>
        </footer>
    );
}

export default Footer;
