import axios from 'axios'

const client = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach JWT token to every request if present
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('tracy-shop:token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle 401 globally — clear token and redirect to login
client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('tracy-shop:token')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default client
