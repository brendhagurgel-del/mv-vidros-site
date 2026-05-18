"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Lead } from "@/lib/types"

interface LeadsFilters {
  search?: string
  category?: string
  city?: string
  rarity?: string
  status?: string
  page?: number
}

interface LeadsResponse {
  leads: Lead[]
  total: number
  page: number
  perPage: number
}

export function useLeads(initialFilters: LeadsFilters = {}) {
  const [filters, setFilters] = useState(initialFilters)

  const query = useQuery<LeadsResponse>({
    queryKey: ["leads", filters],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (filters.search) params.set("search", filters.search)
      if (filters.category) params.set("category", filters.category)
      if (filters.city) params.set("city", filters.city)
      if (filters.rarity) params.set("rarity", filters.rarity)
      if (filters.status) params.set("status", filters.status)
      params.set("page", String(filters.page ?? 1))
      const res = await fetch(`/api/leads?${params}`)
      if (!res.ok) throw new Error("Failed to fetch leads")
      return res.json()
    },
    refetchInterval: 30000,
    staleTime: 15000,
  })

  return { ...query, filters, setFilters }
}
