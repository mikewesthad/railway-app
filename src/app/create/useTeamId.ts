"use client";

import { useSearchParams } from "next/navigation";

export function useTeamId() {
  const searchParams = useSearchParams();
  return searchParams.get("teamId") ?? "";
}
