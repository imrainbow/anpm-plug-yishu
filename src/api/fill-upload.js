import request from '@/request'

// 上传填充文件
export const uploadFillFile = (data) => request.post('/upload', data)


