import { auth0 } from "@/lib/auth0";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const getRailwayToken = async () => {
  const session = await auth0.getSession();
  if (!session) {
    return null;
  }

  const dbUser = await prisma.user.findUnique({
    where: { auth0Id: session.user.sub },
    include: { railwayToken: true },
  });

  return dbUser?.railwayToken?.value ?? null;
};

/**
 * This API simply forwards GQL requests along to Railway's API, using the
 * user's provided token
 */
export async function POST(request: Request) {
  const railwayToken = await getRailwayToken();
  if (!railwayToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const response = await fetch("https://backboard.railway.com/graphql/v2", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${railwayToken}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return NextResponse.json(data);
}
