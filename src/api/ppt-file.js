import request from '@/request2'

// 获取文件
export const getFile = (id) => request.get(`/files/${id}/raw`)
