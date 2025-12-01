export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { queryPinecone } from "@/lib/queryPinecone";

export async function POST(req: NextRequest) {
  try {
    const { userId, question } = await req.json();

    if (!userId || !question) {
      return NextResponse.json(
        { error: "userId and question are required" },
        { status: 400 }
      );
    }

    const answer = await queryPinecone(userId, question);

    return NextResponse.json({ answer });
  } catch (error: any) {
    console.error("Query error:", error);
    return NextResponse.json(
      { error: error.message ?? "Something went wrong" },
      { status: 500 }
    );
  }
}
