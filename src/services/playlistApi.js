import http from './http'

export const api_get_playlistDetail = id => http.get('/playlist/detail', { params: { id } })
