import http from './http'

export const get_toplist = () => http.get('/toplist')

export const get_playlist_detail = id => http.get('/playlist/detail', { params: { id } })

export const get_playlist_catlist = () => http.get('/playlist/catlist')

export const get_top_playlist = (cat, offset, limit, order) => http.get('/top/playlist', { params: { cat, offset, limit, order } })
