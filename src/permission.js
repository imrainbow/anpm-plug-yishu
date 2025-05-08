import router from './router'
import store from './store'

// 路由守卫
router.beforeEach((to, from, next) => {
    const token = store.state.user.token
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

    // 动态设置页面标题
    const defaultTitle = '黟数检光数智管理平台'
    // 优先取最后一个 matched 路由的 meta.title
    const pageTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)?.meta.title || defaultTitle
    document.title = pageTitle
    if (requiresAuth && !token) {
        // 需要登录但未登录，重定向到登录页
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        })
    } else if (token && to.path === '/login') {
        // 已登录且访问登录页，重定向到首页
        next({ path: '/' })
    } else {
        // 其他情况正常放行
        next()
    }
}) 