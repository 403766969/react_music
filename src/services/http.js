import axios from 'axios'

import { BASE_URL, TIMEOUT } from './config'

// 请求列表
const requestList = []

// 取消重复的请求
const stopRepeatRequest = (url, method) => {
  for (let i = 0; i < requestList.length; i++) {
    let item = requestList[i]
    if (item.url === url && item.method === method) {
      item.cancel && item.cancel()
      requestList.splice(i, 1)
      break
    }
  }
}

// 取消请求token
const CancelToken = axios.CancelToken

// 创建axios实例
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT
})

// 请求拦截器
instance.interceptors.request.use(config => {
  if (!config.ignore) {
    let url = config.url
    let method = config.method
    stopRepeatRequest(url, method)
    config.cancelToken = new CancelToken(function executor(c) {
      let request = {
        url: url,
        method: method,
        cancel: c
      }
      requestList.push(request)
    })
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(res => {
  if (!res.config.ignore) {
    stopRepeatRequest(res.config.url, res.config.method)
  }
  return res.data
}, err => {
  if (!axios.isCancel(err) && !err.config.ignore) {
    stopRepeatRequest(err.config.url, err.config.method)
  }
  if (err && err.response) {
    switch (err.response.status) {
      case 400:
        console.warn('请求错误')
        break
      case 401:
        console.warn('未授权访问')
        break
      default:
        console.warn('其他错误信息')
    }
  }
  return Promise.reject(err)
})

export default instance
