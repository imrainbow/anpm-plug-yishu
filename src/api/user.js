import request from '@/request'


// 注册
export function addUser(data) {
    return request({
        url: '/register',
        method: 'post',
        data
    })
}


// 登录
export function login(data) {
    return request({
        url: '/login',
        method: 'post',
        data
    })
}