import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

const SignupSchema = z.object({
    username: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8),
});

export const dynamic = "force-dynamic";


export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsed = SignupSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { message: "Invalid input", errors: parsed.error.format() },
                { status: 400 }
            );
        }

        const { username, email, password } = parsed.data;

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "User with this email already exists" },
                { status: 409 }
            );
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name: username,
                email,
                passwordHash,
            },
        });

        return NextResponse.json(
            { message: "User created successfully", userId: user.id },
            { status: 201 }
        );
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
