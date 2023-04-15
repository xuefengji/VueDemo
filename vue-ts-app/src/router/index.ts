import { createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const Login = () => import('@/views/Login/Login.vue')
const Home = () => import('@/views/Home/Home.vue')
const Sign = () => import('@/views/Sign/Sign.vue')
const Exception = () => import('@/views/Exception/Exception.vue')
const Apply = () => import('@/views/Apply/Apply.vue')
const Check = () => import('@/views/Check/Check.vue')

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
    component: Home,
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
          icon: 'document-copy',
          auth: true
        },
        component: Sign
      },
      {
        path: 'exception',
        name: 'exception',
        component: Exception
      },
      {
        path: 'check',
        name: 'check',
        component: Check
      },
      {
        path: 'apply',
        name: 'apply',
        component: Apply
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
