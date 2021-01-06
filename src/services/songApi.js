import http from './http'

export const getSongDetailApi = ids => http.get('/song/detail', { params: { ids } })

export const getSimiPlayListApi = id => http.get('/simi/playlist', { params: { id } })

export const getSimiSongApi = id => http.get('/simi/song', { params: { id } })
