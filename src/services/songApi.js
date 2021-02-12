import http from './http'

export const get_song_detail = ids => http.get('/song/detail', { params: { ids } })

export const get_lyric = id => http.get('/lyric', { params: { id } })

export const get_simi_playlist = id => http.get('/simi/playlist', { params: { id } })

export const get_simi_song = id => http.get('/simi/song', { params: { id } })

export const get_check_music = id => http.get('/check/music', {
  params: {
    id
  },
  validateStatus: status => {
    return status < 500
  }
})
