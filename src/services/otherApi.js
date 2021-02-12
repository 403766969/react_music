import http from './http'

export const get_banner = () => http.get('/banner')

export const get_personalized = limit => http.get('/personalized', { params: { limit } })

export const get_top_album = (limit, offset) => http.get('/top/album', { params: { limit, offset } })

export const get_artistList = (cat, limit) => http.get('/artist/list', { params: { cat, limit } })
