import http from './http'

export const get_banner = () => http.get('/banner')

export const get_personalized = limit => http.get('/personalized', { params: { limit } })

