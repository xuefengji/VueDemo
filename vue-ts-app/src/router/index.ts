import { createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import store from '@/store'
import type { StateAll } from "@/store";
import _ from 'lodash';

declare module 'vue-router' {
  interface RouteMeta {
    menu?: boolean,
    title?: string,
    icon?: string,
    auth?: boolean
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home/Home.vue'),
    meta: {
      menu: true,
      title: '考勤管理',
      icon: 'document-copy',
      auth: true
    },
    children: [
      {
        path: 'sign',
        name: 'sign',
        meta: {
          menu: true,
          title: '在线打卡签到',
          icon: 'calendar',
          auth: true
        },
        component: () => import('@/views/Sign/Sign.vue'),
        //进入页面前获取相关考勤信息
        beforeEnter (to, from, next){
          const usersInfos = (store.state as StateAll).users.infos
          const signInfos = (store.state as StateAll).signs.infos
          if (_.isEmpty(signInfos)) {
            store.dispatch('signs/getTime', {userid: usersInfos._id}).then((res) => {
              if (res.data.errcode === 0){
                store.commit('signs/updateInfos', res.data.infos)
                next()
              }
            })
          }
          else {
            next()
          }

        }
      },
      {
        path: 'exception',
        name: 'exception',
        meta: {
          menu: true,
          title: '异常考勤查询',
          icon: 'warning',
          auth: true
        },
        component: () => import('@/views/Exception/Exception.vue')
      },
      {
        path: 'check',
        name: 'check',
        meta: {
          menu: true,
          title: '我的考勤审批',
          icon: 'finished',
          auth: true
        },
        component: () => import('@/views/Check/Check.vue')
      },
      {
        path: 'apply',
        name: 'apply',
        meta: {
          menu: true,
          title: '添加考勤审批',
          icon: 'document-add',
          auth: true
        },
        component: () => import('@/views/Apply/Apply.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//增加路由拦截
router.beforeEach((to, from, next) => {
  const token = (store.state as StateAll).users.token
  const infos = (store.state as StateAll).users.infos
  if(to.meta.auth && _.isEmpty(infos)){
    if (token) {
      store.dispatch('users/infos').then((res) => {
        store.commit('users/updateInfos', res.data.infos)
        next()
      })
    } else {
      next('/login')
    }
  }else {
    if (token && to.path === '/login') {
      next('/')
    } else {
      next()
    }

  }
})

export default router
