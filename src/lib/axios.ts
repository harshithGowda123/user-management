import axios from "axios"

const api = axios.create({
  baseURL: "",
  timeout: 15000
})

api.interceptors.response.use(res => res, err => {
  const message = err?.response?.data?.message || err.message || "Request failed"
  return Promise.reject(new Error(message))
})

export default api