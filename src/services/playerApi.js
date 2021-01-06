import http from './http'

export const getSongDetailApi = ids => http.get('/song/detail', { params: { ids } })
