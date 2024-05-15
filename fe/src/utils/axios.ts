import axios from 'axios'

const instance = axios.create({
  baseURL: '/api/v1',
  timeout: 60000,
})

// 请求拦截器
instance.interceptors.request.use(
  // 在发送请求前实现逻辑
  config => {
    // console.log(config)
    return config
  },
  err => {
    // console.log(err)
    return Promise.reject(err)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  // 2xx 范围内状态码 都会触发该钩子
  res => {
    if (res.status === 200) {
      return res.data
    }
    return res
  },
  // 超出 2xx 范围内状态码触发该钩子
  err => {
    return Promise.reject(err)
  }
)

export default instance
