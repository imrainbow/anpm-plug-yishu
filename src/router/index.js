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
    component: () => import('../views/system-management/index.vue'),
    children: [
      {
        path: 'file-upload',
        name: 'file-upload',
        component: () => import('../views/system-management/file-upload.vue'),
        meta: {
          title: '文件管理'
        }
      },
      {
        path: 'upload-records',
        name: 'upload-records',
        component: () => import('../views/system-management/upload-records.vue'),
        meta: {
          title: '操作记录'
        }
      },
      {
        path: 'user-management',
        name: 'user-management',
        component: () => import('../views/system-management/user-management.vue'),
        meta: {
          title: '用户管理'
        }
      }

    ]
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
  },
  {
    path: '/business-management',
    name: 'business-management',
    component: () => import('../views/business-management/index.vue')
  },
  {
    path: '/case-card',
    name: 'case-card',
    component: () => import('../views/business-management/case-card.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
