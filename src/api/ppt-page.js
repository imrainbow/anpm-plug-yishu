
import request from '@/request'
//  按菜单ID查询文件
export const getFilesByMenuID = (params) => request.get(`/files`, { params })

// 下载文件并获取文件内容
