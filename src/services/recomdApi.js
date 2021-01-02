import http from './http'

export const getBannerApi = () => http.get('/banner')

export const getPersonalizedApi = (limit = 8) => http.get('/personalized', { params: { limit: limit } })
