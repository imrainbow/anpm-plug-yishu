import request from '@/request'


// 所有操作日志
export function getAllLogs(params) {
    return request({
        url: '/api/logs',
        method: 'get',
        params
    })
}

// 按id查询操作日志
export function getLogById(id) {
    return request({
        url: `/api/logs/${id}`,
        method: 'get'
    })
}