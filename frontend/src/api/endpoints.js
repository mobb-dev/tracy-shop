import client from './client'

export const getProducts = (params) => client.get('/products', { params })
export const getProduct = (id) => client.get(`/products/${id}`)
export const getOnSaleProducts = () => client.get('/products/onSale')
export const getCategories = () => client.get('/categories')
export const searchProducts = (q) => client.get('/search', { params: { q } })

export const login = (credentials) => client.post('/auth/login', credentials)
export const register = (data) => client.post('/auth/register', data)
export const logout = () => client.post('/auth/logout')

export const getProfile = () => client.get('/users/profile')
export const updateProfile = (data) => client.put('/users/profile', data)
export const getAddresses = () => client.get('/users/addresses')
export const addAddress = (data) => client.post('/users/addresses', data)

export const createOrder = (data) => client.post('/orders', data)
export const getOrders = () => client.get('/orders')
export const getOrder = (id) => client.get(`/orders/${id}`)
