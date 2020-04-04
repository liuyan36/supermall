import axios from 'axios'

export function request(config) {
  // 1.创建实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000/api/h8',
    timeout: 5000
  })

  // 2.axios拦截器
  // 2.1  请求拦截的作用
  instance.interceptors.request.use(config => {
    return config     // 拦截后需要原封不动的返回出去，拿到后要还过去
  }, err => {
  }) // 拦截两个

  // 2.2  响应拦截
  instance.interceptors.response.use(res => { //拦截响应
    // console.log(res)
    return res.data
  }, err => {
    console.log(err)
  })

  // 3.发送真正的网络请求
    return instance(config)
}
