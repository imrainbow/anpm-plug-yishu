import { createRouter, createWebHashHistory } from 'vue-router'

// 系统管理模块的子路由配置
const systemManagementRoutes = [
  {
    path: 'file-upload',
    name: 'file-upload',
    component: () => import('@/views/system-management/file-upload.vue'),
    meta: {
      title: '文件管理',
      requiresAuth: true
    }
  },
  {
    path: 'ppt-menu',
    name: 'ppt-menu',
    component: () => import('@/views/system-management/ppt-menu.vue'),
    meta: {
      title: 'PPT菜单管理',
      requiresAuth: true
    }
  },

  {
    path: 'upload-records',
    name: 'upload-records',
    component: () => import('@/views/system-management/upload-records.vue'),
    meta: {
      title: '操作记录',
      requiresAuth: true
    }
  },
  {
    path: 'user-management',
    name: 'user-management',
    component: () => import('@/views/system-management/user-management.vue'),
    meta: {
      title: '用户管理',
      requiresAuth: true
    }
  }
]

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      requiresAuth: false,
      title: '登录'
    }
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    meta: {
      requiresAuth: true,
      title: "首页"
    }
  },
  {
    path: '/system-management',
    name: 'system-management',
    component: () => import('@/views/system-management/index.vue'),
    meta: {
      requiresAuth: true,
      title: "系统管理"
    },
    children: systemManagementRoutes
  },
  {
    path: '/ai-help',
    name: 'ai-help',
    component: () => import('@/views/ai-help/index.vue'),
    meta: {
      requiresAuth: true,
      title: 'ai辅助'
    }
  },
  {
    path: '/featured-brands',
    name: 'featured-brands',
    component: () => import('@/views/featured-brands/index.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/quality-assurance',
    name: 'quality-assurance',
    component: () => import('@/views/quality-assurance/index.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/case-management',
    name: 'case-management',
    component: () => import('@/views/case-management/index.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/digital-model',
    name: 'digital-model',
    component: () => import('@/views/digital-model/index.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/check-cases',
    name: 'check-cases',
    component: () => import('@/views/check-cases/index.vue'),
    meta: {
      requiresAuth: true,
      title: "检查办案"
    }
  },
  {
    path: '/legal-search',
    name: 'legal-search',
    component: () => import('@/views/legal-search/index.vue'),
    meta: {
      requiresAuth: true,
      title: "法律检索"
    }
  },
  {
    path: '/business-management',
    name: 'business-management',
    component: () => import('@/views/business-management/index.vue'),
    meta: {
      requiresAuth: true,
      title: "案件管理"
    }
  },
  {
    path: '/case-card',
    name: 'case-card',
    component: () => import('@/views/business-management/case-card.vue'),
    meta: {
      requiresAuth: true,
      title: "案件管理"
    }
  },
  {
    path: '/property-management',
    name: 'property-management',
    component: () => import('@/views/business-management/property-management.vue'),
    meta: {
      requiresAuth: true,
      title: "案件管理"
    }
  },

  {
    path: '/ppt-page',
    name: 'ppt-page',
    component: () => import('@/views/featured-brands/index.vue'),
    meta: {
      requiresAuth: true,

    }
  },
  {
    path: '/ppt-page-detail',
    name: 'ppt-page-detail',
    component: () => import('@/views/ppt-page/index.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/statistical-chart',
    name: 'statistical-chart',
    component: () => import('@/views/business-management/statistical-chart.vue'),
    meta: {
      requiresAuth: true,
      title: "案件管理"
    }

  },
  {
    path: '/table-management',
    name: 'table-management',
    component: () => import('@/views/business-management/table-management.vue'),
    meta: {
      requiresAuth: true,
      title: "案件管理"
    }

  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export { systemManagementRoutes }
export default router
