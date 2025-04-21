import request from '@/request'


// 注册
export function addUser(data) {
    return request({
        url: '/api/register',
        method: 'post',
        data
    })
}


// 登录
export function login(data) {
    return request({
        url: '/api/login',
        method: 'post',
        data
    })
}
export function initMenu() {
    return request({
        url: '/api/init-menus',
        method: 'post',

    })
}

// 获取用户列表
export function getUserList(data) {
    return request({
        url: '/api/users',
        method: 'get',
        params: data
    })
}
// 修改密码
export function editPassword(data) {
    return request({
        url: '/api/edit-password',
        method: 'post',
        data
    })
}