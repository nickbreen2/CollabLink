import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    const email = "seed+" + Date.now() + "@example.com";
    const handle = "seeduser-" + Math.floor(Math.random() * 10000);
    const passwordHash = await bcrypt.hash("Test123!", 10);

    const user = await prisma.$transaction(async (tx) => {
      const u = await tx.user.create({
        data: { email, passwordHash },
      });
      await tx.creatorStore.create({
        data: { userId: u.id, handle },
      });
      return u;
    });

    return NextResponse.json(
      { ok: true, userId: user.id, email: user.email, handle },
      { status: 201 }
    );
  } catch (err: any) {
    if (process.env.NODE_ENV === "development") {
      console.error("[SEED_USER_ERROR_DEV]", err);
      return NextResponse.json(
        { ok: false, error: String(err?.message ?? err) },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { ok: false, error: "Internal error" },
      { status: 500 }
    );
  }
}

