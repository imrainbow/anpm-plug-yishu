import request from '@/request'

// 获取案卡列表（基本查询）
export const getCases = (params) => request.get('/cases', { params })


// 批量创建案卡
export const batchCreateCases = (data) => request.post('/cases/batch', data)

// 导出案卡
export const exportCases = (params) => request.get('/cases/export', { params })

// 创建案卡
export const createCase = (data) => request.post('/cases', data)

// 编辑案卡
export const editCase = (data) => request.put(`/cases/${data.ID}`, data)

// 删除案卡
export const deleteCase = (id) => request.delete(`/cases/${id}`)
