import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      redirect: '/home',
      component: () => import('@/views/Main.vue'),
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('../views/Home.vue')
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('../views/User.vue')
        },
        {
          path: '/mall',
          name: 'mall',
          component: () => import('../views/Product.vue')
        }
      ]
    },
   
  ]
})

export default router
