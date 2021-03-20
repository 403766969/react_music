import http from './http'

export const get_dj_catelist = () => http.get('/dj/catelist')

export const get_dj_recommend_type = type => http.get('/dj/recommend/type', { params: { type } })

export const get_dj_radio_hot = (cateId, offset, limit) => http.get('/dj/radio/hot', { params: { cateId, offset, limit } })
