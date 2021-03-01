import http from './http'

export const get_top_album = (offset, limit) => http.get('/top/album', { params: { offset, limit } })
