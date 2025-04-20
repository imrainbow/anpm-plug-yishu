import request from '@/request'

// 获取PPT菜单列表
export const getPptMenuList = () => request.get('/menu-tree')
// 获取PPT菜单列表（不是树形）
export const getPptMenuListNotTree = () => request.get('/menus')
// 创建PPT菜单
export const addPptMenu = (data) => request.post('/menus', data)

// 更新PPT菜单
export const updatePptMenu = (id, data) => request.put(`/menus/${id}`, data)

// 删除PPT菜单
export const deletePptMenu = (id) => request.delete(`/menus/${id}`)

