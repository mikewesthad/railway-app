import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth0 } from "@/lib/auth0";

export async function GET() {
  try {
    const session = await auth0.getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { auth0Id: session.user.sub },
      include: { railwayToken: true },
    });

    if (!dbUser) {
      return NextResponse.json({
        hasToken: false,
        createdAt: null,
      });
    }

    return NextResponse.json({
      hasToken: !!dbUser.railwayToken,
      createdAt: dbUser.railwayToken?.createdAt,
    });
  } catch (error) {
    console.error("Error fetching token:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth0.getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // TODO: to start, all accounts require an email. If we add social logins,
    // this is not a hard constraint.
    const email = session.user.email;
    const auth0Id = session.user.sub;
    if (!email) {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const { value } = await req.json();
    if (!value) {
      return NextResponse.json({ error: "Missing token value" }, { status: 400 });
    }

    let dbUser = await prisma.user.findUnique({
      where: { auth0Id },
    });

    if (!dbUser) {
      dbUser = await prisma.user.create({
        data: {
          email,
          auth0Id,
        },
      });
    }

    // TODO: encrypt the token value.
    const token = await prisma.railwayToken.upsert({
      where: {
        userId: dbUser.id,
      },
      update: {
        value,
      },
      create: {
        userId: dbUser.id,
        value,
      },
    });

    return NextResponse.json({
      createdAt: token.createdAt,
    });
  } catch (error) {
    console.error("Error storing token:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const session = await auth0.getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const auth0Id = session.user.sub;
    const dbUser = await prisma.user.findUnique({
      where: { auth0Id },
    });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    await prisma.railwayToken.delete({
      where: {
        userId: dbUser.id,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting token:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
