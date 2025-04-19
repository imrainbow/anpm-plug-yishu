import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from './store'

const request = axios.create({
    baseURL: '/api',
    timeout: 1000 * 60 * 2,
})

// 添加请求拦截器
request.interceptors.request.use(
    (config) => {
        // 获取 token
        const token = store.state.user.token
        // 如果不是登录接口，添加 token
        if (token && !config.url.includes('/login')) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)


export default request
