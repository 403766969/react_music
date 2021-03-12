import http from './http'

export const get_mv_detail = mvid => http.get('/mv/detail', { params: { mvid } })

export const get_mv_url = id => http.get('/mv/url', { params: { id } })

export const get_comment_hot = (id, offset, limit, type = 1) => http.get('/comment/hot', { params: { id, offset, limit, type } })

export const get_comment_mv = (id, offset, limit) => http.get('/comment/mv', { params: { id, offset, limit } })

export const get_simi_mv = mvid => http.get('/simi/mv', { params: { mvid } })
