import http from './http'

export const getBannerApi = () => http.get('/banner')

export const getPersonalizedApi = limit => http.get('/personalized', { params: { limit } })

export const getTopAlbumApi = (limit, offset) => http.get('/top/album', { params: { limit, offset } })

export const getTopListApi = idx => http.get('/top/list', { params: { idx } })

export const getArtistListApi = (cat, limit) => http.get('/artist/list', { params: { cat, limit } })
