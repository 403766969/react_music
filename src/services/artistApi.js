import http from './http'

export const get_top_artists = (limit, offset) => http.get('/top/artists', { params: { limit, offset } })
