// 1. 引入
import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入需要配置路由的页面
import Login from '@/views/Login.vue'
import Index from '@/views/Index.vue'
// 引入子组件
import Welcome from '@/components/hl_back_Welcome.vue'
import Article from '@/components/hl_back_Article.vue'
import Publish from '@/views/publish.vue'
// 挂载
Vue.use(VueRouter)

// 创建一个对象
let router = new VueRouter({
  routes: [{
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'index',
    path: '/',
    component: Index,
    // 使用重定向，加载默认的子组件
    redirect: { name: 'welcome' },
    children: [
      {
        name: 'welcome',
        path: 'welcome',
        component: Welcome
      },
      {
        name: 'article',
        path: 'article',
        component: Article
      },
      {
        name: 'publish',
        path: 'publish',
        component: Publish
      }
    ]
  }
  ]
})

// 在路由中添加导航守卫
router.beforeEach((to, from, next) => {
  // 如果是不需要的就直接next
  if (to.path === '/login') {
    next()
  } else {
    // 判断用户是否已经登录，如果没有登录，应该跳转到登录页面
    // 如果已经登录就正常显示
    let token = localStorage.getItem('hl_back_token')
    if (token) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  }
})

// 暴露
export default router
