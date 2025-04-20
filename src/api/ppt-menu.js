import request from '@/request'

// 获取PPT菜单列表
export const getPptMenuList = () => request.get('/api/menu-tree')
// 获取PPT菜单列表（不是树形）
export const getPptMenuListNotTree = () => request.get('/api/menus')
// 创建PPT菜单
export const addPptMenu = (data) => request.post('/api/menus', data)

// 更新PPT菜单
export const updatePptMenu = (id, data) => request.put(`/api/menus/${id}`, data)

// 删除PPT菜单
export const deletePptMenu = (id) => request.delete(`/api/menus/${id}`)

