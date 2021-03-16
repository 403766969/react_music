import http from './http'

export const get_artists = id => http.get('/artists', { params: { id } })

export const get_artist_desc = id => http.get('/artist/desc', { params: { id } })

export const get_artist_album = (id, offset, limit) => http.get('/artist/album', { params: { id, offset, limit } })

export const get_artist_mv = (id, offset, limit) => http.get('/artist/mv', { params: { id, offset, limit } })

export const get_top_artists = (offset, limit) => http.get('/top/artists', { params: { offset, limit } })

export const get_artist_list = (area, type, initial, offset, limit) => http.get('/artist/list', { params: { area, type, initial, offset, limit } })
