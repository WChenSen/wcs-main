import axios from 'axios'
import type { AxiosError, AxiosResponse } from 'axios'
import { getToken, TOKEN_KEY, removeToken } from './auth'
import { closeToast, showNotify } from 'vant'

const generatorNotify = (message: string) =>
  showNotify({
    type: 'danger',
    message
  })

const baseURL = import.meta.env.VITE_APP_BASE_API

const request = axios.create({
  baseURL,
  timeout: 30000
})

request.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers[TOKEN_KEY] = token
    }

    return config
  },
  (error: AxiosError) => {
    closeToast()
    generatorNotify(error.message)
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data, code, message, msg } = response.data
    const notifyMessage = message ?? msg ?? '出错了'

    closeToast()
    if (code === 200 || code === 1) {
      return data
    } else if (code === 401) {
      generatorNotify('登录失效，请重新登录')
      code === 401 && removeToken()
      return Promise.reject(new Error(notifyMessage))
    } else {
      generatorNotify(notifyMessage)
      return Promise.reject(new Error(notifyMessage))
    }
  },
  (error: AxiosError) => {
    closeToast()
    const codeMap = {
      401: '登录失效，请重新登录',
      403: '拒绝访问',
      404: '请求地址错误',
      500: '服务器故障'
    } as Record<string, string>
    error.code && generatorNotify(codeMap[error.code])
    return Promise.reject(error)
  }
)

export { request }
