import request from '@/request'

// 上传填充文件
export const uploadFillFile = (data) => request.post('/api/upload', data)

// 获取填充文件列表
export const getFillFileList = (params) => request.get('/api/files', { params })

// 删除填充文件
export const deleteFillFile = (id) => request.delete(`/api/files/${id}`)
// 修改文件
export const updateFillFile = (id, data) => request.put(`/api/files/${id}`, data)


