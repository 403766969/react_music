import http from './http'

export const api_get_playlistDetail = id => http.get('/playlist/detail', { params: { id } })

export const api_get_playlistCatlist = () => http.get('/playlist/catlist')
