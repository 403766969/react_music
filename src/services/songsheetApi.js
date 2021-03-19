import http from './http'

export const get_toplist = () => http.get('/toplist')

export const get_playlist_catlist = () => http.get('/playlist/catlist')

export const get_top_playlist = (cat, order, offset, limit) => http.get('/top/playlist', { params: { cat, order, offset, limit } })

export const get_playlist_detail = (id, ignore = false) => http.get('/playlist/detail', { params: { id }, ignore: ignore })

export const get_comment_hot = (id, offset, limit, type = 2) => http.get('/comment/hot', { params: { id, offset, limit, type } })

export const get_comment_playlist = (id, offset, limit) => http.get('/comment/playlist', { params: { id, offset, limit } })

export const get_related_playlist = id => http.get('/related/playlist', { params: { id } })
