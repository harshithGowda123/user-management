import api from "./axios"

// Simple single-request cache so Dashboard and Users can share fetched data without double fetch
let cache: any = null
export async function fetchNinetyUsers() {
  if (cache) return cache
  const url = "https://randomuser.me/api/?results=90&nat=us,gb,fr,br,au,ca,es,dk,fi,ir,in"
  const res = await api.get(url, { timeout: 20000 })
  cache = res.data.results || []
  return cache
}