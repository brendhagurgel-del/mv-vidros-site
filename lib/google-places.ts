export interface GooglePlaceLead {
  name: string
  address: string
  phone: string
  website: string
  rating: number
  googlePlaceId: string
  category: string
}

export async function searchBusinesses(niche: string, city: string): Promise<GooglePlaceLead[]> {
  const url = new URL("https://maps.googleapis.com/maps/api/place/textsearch/json")
  url.searchParams.set("query", `${niche} em ${city}`)
  url.searchParams.set("language", "pt-BR")
  url.searchParams.set("type", "establishment")
  url.searchParams.set("key", process.env.GOOGLE_PLACES_API_KEY!)
  const res = await fetch(url.toString(), { next: { revalidate: 3600 } })
  const data = await res.json()
  if (!data.results) return []
  return data.results.map(formatPlace)
}

interface GooglePlace {
  name: string
  formatted_address: string
  formatted_phone_number?: string
  website?: string
  rating?: number
  place_id: string
  types: string[]
}

function formatPlace(place: GooglePlace): GooglePlaceLead {
  return {
    name: place.name,
    address: place.formatted_address,
    phone: place.formatted_phone_number ?? "",
    website: place.website ?? "",
    rating: place.rating ?? 0,
    googlePlaceId: place.place_id,
    category: place.types[0] ?? "",
  }
}
