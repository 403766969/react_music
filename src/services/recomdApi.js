import http from './http'

export const getBannerApi = () => http.get('/banner')

export const getPersonalizedApi = (limit = 8) => http.get('/personalized', { params: { limit } })

export const getTopAlbumApi = (limit = 10, offset = 0) => http.get('/top/album', { params: { limit, offset } })
