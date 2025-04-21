import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from './store'

const request = axios.create({
    baseURL: '',
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

// 添加响应拦截器
request.interceptors.response.use(
    (response) => {
        const { code, data, msg } = response.data
        console.log(code, data, msg)
        if (code === 0) {
            return {
                success: true,
                data
            }
        } else {
            // 非0状态码，显示错误信息
            ElMessage.error(msg || '请求失败')
            return Promise.resolve({
                success: false,
                message: msg || '请求失败'
            })
        }
    },
    (error) => {

        ElMessage.error(error.message || '请求失败')
        return {
            success: false,
            message: error.message || '请求失败'
        }
    }
)

export default request
