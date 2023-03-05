import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import './assets/less/index.less'

import store from '../store'
import router from '../router'

import http from "axios";
import '../api/mock'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = http

//判断是否登录，如果登录跳转相关页面，否则跳转login
router.beforeEach((to, from, next) => {
  store.commit('getToken')
  const token = store.state.user.token
  if (!token && to.name !== 'login') {
    next({ name: 'login' })
  } else {
    next()
  }
})

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
