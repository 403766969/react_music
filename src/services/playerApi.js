import http from './http'

export const api_get_songDetail = ids => http.get('/song/detail', { params: { ids } })
