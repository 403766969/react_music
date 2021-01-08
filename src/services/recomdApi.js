import http from './http'

export const api_get_banner = () => http.get('/banner')

export const api_get_personalized = limit => http.get('/personalized', { params: { limit } })

export const api_get_topAlbum = (limit, offset) => http.get('/top/album', { params: { limit, offset } })

export const api_get_topList = idx => http.get('/top/list', { params: { idx } })

export const api_get_artistList = (cat, limit) => http.get('/artist/list', { params: { cat, limit } })
