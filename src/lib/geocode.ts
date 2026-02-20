/**
 * Geocode a city + state combination using the Mapbox Geocoding API v6.
 * Returns lat/lng coordinates or null if geocoding fails.
 */
export async function geocode(
  city: string,
  state: string
): Promise<{ lat: number; lng: number } | null> {
  const token = process.env.MAPBOX_SECRET_TOKEN
  if (!token) {
    console.error('MAPBOX_SECRET_TOKEN is not set')
    return null
  }

  const query = encodeURIComponent(`${city}, ${state}, United States`)
  const url = `https://api.mapbox.com/search/geocode/v6/forward?q=${query}&access_token=${token}&limit=1`

  try {
    const response = await fetch(url)

    if (!response.ok) {
      console.error(`Geocoding request failed with status ${response.status}`)
      return null
    }

    const data = await response.json()

    if (!data.features || data.features.length === 0) {
      return null
    }

    const [lng, lat] = data.features[0].geometry.coordinates
    return { lat, lng }
  } catch (error) {
    console.error('Geocoding error:', error)
    return null
  }
}
