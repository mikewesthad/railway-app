import type { NextRequest } from "next/server";
import { auth0 } from "./lib/auth0";

/**
 * Auth0 Route Documentation:
 * @route /auth/login - Initiates the Auth0 login flow
 * @route /auth/logout - Logs the user out of their Auth0 session
 * @route /auth/callback - Handles the redirect after successful Auth0 login
 * @route /auth/profile - Retrieves the authenticated user's profile information
 * @route /auth/access-token - Verifies user session and returns an access token (auto-refreshes if refresh token available)
 * @route /auth/backchannel-logout - Handles logout tokens from Back-Channel Logout initiators
 */
export async function middleware(request: NextRequest) {
  return await auth0.middleware(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
