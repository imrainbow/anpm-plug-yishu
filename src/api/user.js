import request from '@/request'

export function addUser(data) {
    return request({
        url: '/register',
        method: 'post',
        data
    })
}
