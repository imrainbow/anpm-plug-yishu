import request from '@/request'

// 上传填充文件
export const uploadFillFile = (data) => request.post('/upload', data)

// 获取填充文件列表
export const getFillFileList = (params) => request.get('/files', { params })

// 删除填充文件
export const deleteFillFile = (id) => request.delete(`/files/${id}`)
// 修改文件
export const updateFillFile = (id, data) => request.put(`/files/${id}`, data)


