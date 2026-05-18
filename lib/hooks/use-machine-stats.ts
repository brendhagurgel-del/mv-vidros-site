"use client"

import { useQuery } from "@tanstack/react-query"
import { UserStats } from "@/lib/types"

export function useMachineStats() {
  return useQuery<UserStats>({
    queryKey: ["user-stats"],
    queryFn: async () => {
      const res = await fetch("/api/user/stats")
      if (!res.ok) throw new Error("Failed to fetch stats")
      return res.json()
    },
    refetchInterval: 30000,
    staleTime: 15000,
  })
}
