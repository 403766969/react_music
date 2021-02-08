import http from './http'

export const api_get_playlistDetail = id => http.get('/playlist/detail', { params: { id } })

export const api_get_playlistCatlist = () => http.get('/playlist/catlist')

export const api_get_topPlaylist = (cat, offset, limit, order) => http.get('/top/playlist', { params: { cat, offset, limit, order } })
