import http from './http'

const getBannersApi = () => http.get('/banner')

export {
  getBannersApi
}
