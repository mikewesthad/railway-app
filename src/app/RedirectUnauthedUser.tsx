"use client";

import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * I'm not focusing on Auth as part of this demo. It is mostly here to allow
 * multiple users to have their tokens saved. This is a quick and dirty way to
 * force all unauthed users to the login page.
 */
export function RedirectUnauthedUser() {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const needsRedirectToHome = !isLoading && !user && pathname !== "/";

  useEffect(() => {
    if (needsRedirectToHome) {
      router.push("/");
    }
  }, [needsRedirectToHome, router]);

  return null;
}
