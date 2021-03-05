import http from './http'

export const get_search = (keywords, type, offset, limit) => http.get('/search', { params: { keywords, type, offset, limit } })

export const get_search_suggest = keywords => http.get('/search/suggest', { params: { keywords } })
