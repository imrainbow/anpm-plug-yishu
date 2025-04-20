
import request from '@/request'
//  按菜单ID查询文件
export const getFilesByMenuID = (params) => request.get(`/api/files`, { params })


// 获取图片信息
export const previewPPT = (pptId) => request.get(`/api/preview/ppt/${pptId}`)

