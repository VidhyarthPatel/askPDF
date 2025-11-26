import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const isLoggedIn = !!req.auth;

    // Protect /chat
    if (req.nextUrl.pathname.startsWith("/chat")) {
        if (!isLoggedIn) {
            return NextResponse.redirect(new URL("/signin", req.url)); // redirect to homepage
        }
    }
});

// Apply middleware only to specific paths
export const config = {
    matcher: ["/chat/:path*"],
};
