import Axios, { AxiosPromise, AxiosRequestConfig, Method } from 'axios'

import { Message as message } from '@arco-design/web-vue'

interface RequestParams {
  api: string
  param?: Record<string, any>
  method?: Method
  config?: AxiosRequestConfig
}

// 公共参数
// const baseUrl = ''

// 公共Axios实例
const axios = Axios.create({
  baseURL: `${location.origin}/api/`,
  timeout: 10000,
  headers: {
    post: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  },
})

/**
 *
 * @param status
 */
const getErrorCode2text = (status: number, data: { error: string }): string => {
  let content: string
  switch (status) {
    case 400:
    case 412:
      content = data.error
      break
    case 401:
      content = '您没有权限，无法访问'
      break
    case 403:
      content = '登录已过期，请重新登录'
      break
    case 404:
      content = '访问资源不存在'
      break
    case 500:
      content = '服务异常'
      break
    default:
      content = '未知异常'
      break
  }
  return content
}

// Request 过滤器
axios.interceptors.request.use(request => {
  const { params } = request

  // 过滤空参数
  if (params) {
    const keys = Object.keys(params)
    for (const key of keys) {
      const value = params[key]
      switch (value) {
        case undefined:
        case null:
        case '':
          delete params[key]
          break
      }
    }
  }

  return request
})

// Response 过滤器
axios.interceptors.response.use(
  response => {
    const { data } = response
    return data?.data || data
  },
  /** 请求无响应 */
  error => {
    if (error.response) {
      const { config, data, status } = error.response
      const show = config.message?.show ?? true

      if (show) {
        const callback = config.message?.callback

        // 处理各种状态下的消息
        console.log(status, data)
        const content = getErrorCode2text(status, data)

        message.error(content)
      }
    }
    // 请求服务未响应，error.response为undefined，走此分支
    else if (error.message) {
      let __emsg: string = error.message || ''
      if (__emsg.indexOf('timeout') >= 0) {
        __emsg = '请求超时'
      }
      switch (__emsg) {
        case 'Network Error':
          message.error('网络错误, 无法连接服务器')
          break
        default:
          message.error(__emsg)
          break
      }
    }
    throw error
  },
)

export default function <T = any>({
  api,
  method = 'post',
  param = {},
  config = {},
}: RequestParams): Promise<T> {
  const params = {
    url: api,
    method,
    ...config,
  }
  const ginseng = method === 'get' ? 'params' : 'data'
  params[ginseng] = param
  return axios.request(params)
}
