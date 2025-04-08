import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/dashboard/index.vue')
  },
  {
    path: '/system-management',
    name: 'system-management',
    component: () => import('../views/system-management/index.vue')
  },
  {
    path: '/ai-help',
    name: 'ai-help',
    component: () => import('../views/ai-help/index.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
