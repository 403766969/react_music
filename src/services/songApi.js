import http from './http'

export const get_song_detail = ids => http.get('/song/detail', { params: { ids }, timeout: 300000 })

export const get_lyric = id => http.get('/lyric', { params: { id } })

export const get_comment_hot = (id, offset, limit, type = 0) => http.get('/comment/hot', { params: { id, offset, limit, type } })

export const get_comment_music = (id, offset, limit) => http.get('/comment/music', { params: { id, offset, limit } })

export const get_simi_playlist = id => http.get('/simi/playlist', { params: { id } })

export const get_simi_song = id => http.get('/simi/song', { params: { id } })

export const get_check_music = (id, ignore = false) => http.get('/check/music', { params: { id }, ignore: ignore })
