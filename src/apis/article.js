import axios from '@/utils/myaxios'

export const ArticleList = (params) => {
  return axios({
    url: '/post',
    params
  })
}
