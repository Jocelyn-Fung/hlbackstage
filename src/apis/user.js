// 这个文件专门用于处理用户相关的业务
// 1.引入axios
import axios from '@/utils/myaxios.js'

// 2.实现登录
export const userLogin = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
