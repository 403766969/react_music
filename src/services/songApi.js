import http from './http'

export const api_get_songDetail = ids => http.get('/song/detail', { params: { ids } })

export const api_get_songLyric = id => http.get('/lyric', { params: { id } })

export const api_get_simiPlaylist = id => http.get('/simi/playlist', { params: { id } })

export const api_get_simiSong = id => http.get('/simi/song', { params: { id } })

export const api_check_music = id => http.get('/check/music', {
  params: {
    id
  },
  validateStatus: status => {
    return status < 500
  }
})
