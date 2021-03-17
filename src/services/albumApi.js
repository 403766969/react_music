import http from './http'

export const get_album_detail = id => http.get('/album/detail', { params: { id } })

export const get_comment_hot = (id, offset, limit, type = 3) => http.get('/comment/hot', { params: { id, offset, limit, type } })

export const get_comment_album = (id, offset, limit) => http.get('/comment/album', { params: { id, offset, limit } })

export const get_album_newest = () => http.get('/album/newest')

export const get_top_album = (area, offset, limit) => http.get('/top/album', { params: { area, offset, limit } })
