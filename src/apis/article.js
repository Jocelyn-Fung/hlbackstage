import axios from '@/utils/myaxios'

export const ArticleList = (params) => {
  return axios({
    url: '/post',
    params
  })
}

// 文章栏目列表
export const ArticleCate = () => {
  return axios({
    url: '/category'
  })
}

// 发布文章
export const publishArticle = (data) => {
  return axios({
    method: 'post',
    url: '/post',
    data
  })
}
