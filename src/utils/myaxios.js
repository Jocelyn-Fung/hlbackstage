import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:3000'
localStorage.setItem('hl_back_baseURL', 'http://127.0.0.1:3000')
// 添加拦截器
// // Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token = localStorage.getItem('hl_back_token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

export default axios
