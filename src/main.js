import Vue from 'vue'
import App from './App.vue'
import router from '@/router/router.js'
// 完整引入El的框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入要使用的css等
import './style/index.less'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
