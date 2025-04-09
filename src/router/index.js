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
  },
  {
    path: '/featured-brands',
    name: 'featured-brands',
    component: () => import('../views/featured-brands/index.vue')
  },
  {
    path: '/quality-assurance',
    name: 'quality-assurance',
    component: () => import('../views/quality-assurance/index.vue')
  },
  {
    path: '/case-management',
    name: 'case-management',
    component: () => import('../views/case-management/index.vue')
  },
  {
    path: '/digital-model',
    name: 'digital-model',
    component: () => import('../views/digital-model/index.vue')
  },
  {
    path: '/check-cases',
    name: 'check-cases',
    component: () => import('../views/check-cases/index.vue')
  },
  {
    path: '/legal-search',
    name: 'legal-search',
    component: () => import('../views/legal-search/index.vue')
  }


]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
