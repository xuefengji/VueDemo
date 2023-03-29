import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home'
const originalPush = VueRouter.prototype.push
//指定新的push方法
VueRouter.prototype.push = function (location, onResolve, onReject) {
  //制定了一个成功或者失败的回调
  if (onResolve || onReject) {
    //直接调用原来的 push 方法
    // originalPush(location, onResolve, onReject)  //这里使用 call 可以直接指定当前的 router 对象，要是没有这个就会默认是window 对象，启用严格模式之后就是 undefined
    return originalPush.call(this, location, onResolve, onReject)
  }
  //如果没有指明一个成功或者失败的回调，需要使用到catch处理
  return originalPush.call(this, location).catch((err) => {
    //如果是重复导航所引起的错误的话
    if (VueRouter.isNavigationFailure(err)) {
      //这个 return err 返回的是成功的 Promise，其中Promise的value是 err
      return err
    }
    //如果是其他的错误就会接着往下传
    return Promise.reject(err)
  })
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    // component: Home
    component: () => import('../views/Main'),
    redirect: '/home',
    children: [
      // {
      //   path: '/home',
      //   name: 'home',
      //   component: () => import('../views/home')
      // },
      // {
      //   path: '/user',
      //   name: 'user',
      //   component: () =>import('../views/user')
      // },
      // {
      //   path: '/mall',
      //   name: 'mall',
      //   component: () =>import('../views/product')
      // },
      // {
      //   path: '/page1',
      //   name: 'page1',
      //   component: () => import('../views/other/pageOne.vue')
      // },
      // {
      //   path: '/page2',
      //   name: 'page2',
      //   component: () => import('../views/other/pageTwo.vue')
      // }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router