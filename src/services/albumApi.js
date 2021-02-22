import http from './http'

export const get_top_album = (limit, offset) => http.get('/top/album', { params: { limit, offset } })
