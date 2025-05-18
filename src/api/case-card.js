import request from '@/request'

// 获取案卡列表（基本查询）
export const getCases = (params) => request.get('/api/cases', { params })


// 批量创建案卡
export const batchCreateCases = (data) => request.post('/api/cases/batch', data)

// 导出案卡
export const exportCases = (params) => request.get('/api/cases/export', { params })

// 创建案卡
export const createCase = (data) => request.post('/api/cases', data)

// 编辑案卡
export const editCase = (data) => request.put(`/api/cases/${data.id}`, data)

// 删除案卡
export const deleteCase = (id) => request.delete(`/api/cases/${id}`)

// 批量删除案卡
export const batchDeleteCases = (ids) => request.post('/api/cases/delete', ids)

// 获取案卡列表（财务部门）
export const getCasesList = (params) => request.get('/api/money', { params })



// 创建涉案款记录
export const createMoneyRecord = (data) => request.post('/api/money', data)

// 编辑涉案款记录
export const editMoneyRecord = (data) => request.put(`/api/money/${data.id}`, data)

// 删除涉案款记录
export const deleteMoneyRecord = (id) => request.delete(`/api/money/${id}`)

// 批量创建涉案款记录
export const batchCreateMoneyRecord = (data) => request.post('/api/money/batch', data)

// 获取涉案款列表
export const getMoneyList = (params) => request.get('/api/money', { params })


// 获取涉案财物列表
export const getPropertyList = (params) => request.get('/api/case-property', { params })

// 创建涉案财物
export const createProperty = (data) => request.post('/api/case-property', data)

// 编辑涉案财物
export const editProperty = (data) => request.put(`/api/case-property/${data.id}`, data)

// 删除涉案财物
export const deleteProperty = (id) => request.delete(`/api/case-property/${id}`)
// 批量删除涉案财物
export const batchDeleteProperty = (ids) => request.post('/api/case-property/delete', ids)


// 批量创建涉案财物
export const batchCreateProperty = (data) => request.post('/api/case-property/batch', data)


// 获取案件类型统计
export const getCaseTypeStatistic = () => request.get('/api/cases/stat/case-type')

// 获取承办部门统计
export const getDepartmentStatistic = () => request.get('/api/cases/stat/handling-dept')

// 获取承办检察官统计
export const getLawyerStatistic = () => request.get('/api/cases/stat/prosecutor')
