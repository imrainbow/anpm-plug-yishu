import request from '@/request'


// 所有操作日志
export function getAllLogs(params) {
    return request({
        url: '/logs',
        method: 'get',
        params
    })
}

// 按id查询操作日志
export function getLogById(id) {
    return request({
        url: `/logs/${id}`,
        method: 'get'
    })
}