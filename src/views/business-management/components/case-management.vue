<template>
  <div class="case-management page-container" style="padding: 0">
    <!-- 顶部 -->
    <div class="case-management-header page-header">
      <div class="header-right">
        <el-button
          type="primary"
          :icon="Download"
          @click="handleDownloadTemplate"
          class="mr-10"
        >
          下载模板
        </el-button>
        <el-upload
          class="upload-excel mr-10"
          action="#"
          :auto-upload="false"
          :show-file-list="false"
          :on-change="handleFileChange"
          accept=".xlsx,.xls"
        >
          <el-button type="primary" :icon="Upload"> 上传Excel </el-button>
        </el-upload>
        <el-button type="primary" :icon="Plus" @click="dialogVisible = true"
          >新增</el-button
        >

        <img src="@/assets/return.png" @click="handleReturn" alt="返回" />
      </div>
    </div>
    <!-- 表格 -->
    <div class="case-management-table">
      <el-table :data="tableData" border style="width: 100%"> </el-table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Download, Upload, Plus } from '@element-plus/icons-vue'
import * as XLSX from 'xlsx'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleReturn = () => {
  router.back()
}
const handleDownloadTemplate = () => {
  // 创建工作簿
  const wb = XLSX.utils.book_new()
  
  // 定义表头数据
  const headers = [
    ['涉案财物管理（案管部门）'],
    ['案件名称', '涉案物品入库', '入库时间', '涉案物品出库', '出库时间', '物品去向', 
     '涉案款入金额', '收入日期', '交款人', '涉案款支出金额', '支出日期', '资金去向', '备注']
  ]
  
  // 创建工作表
  const ws = XLSX.utils.aoa_to_sheet(headers)
  
  // 设置单元格合并
  ws['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 12 } }
  ]
  
  // 设置列宽
  ws['!cols'] = [
    { wch: 15 }, // 案件名称
    { wch: 15 }, // 涉案物品入库
    { wch: 12 }, // 入库时间
    { wch: 15 }, // 涉案物品出库
    { wch: 12 }, // 出库时间
    { wch: 12 }, // 物品去向
    { wch: 12 }, // 涉案款入金额
    { wch: 12 }, // 收入日期
    { wch: 10 }, // 交款人
    { wch: 12 }, // 涉案款支出金额
    { wch: 12 }, // 支出日期
    { wch: 12 }, // 资金去向
    { wch: 12 }  // 备注
  ]

  // 设置行高
  ws['!rows'] = [
    { hpt: 30 }, // 第一行（标题）的高度
    { hpt: 25 }  // 第二行（表头）的高度
  ]

  // 为所有单元格设置默认样式
  for (let i = 0; i <= 12; i++) {
    // 设置标题行样式
    const titleCell = XLSX.utils.encode_cell({ r: 0, c: i })
    if (!ws[titleCell]) ws[titleCell] = { v: '' }
    ws[titleCell].s = {
      font: { bold: true, sz: 14 },
      alignment: { horizontal: 'center', vertical: 'center' },
      fill: { type: 'pattern', patternType: 'solid', fgColor: { rgb: '90EE90' } }
    }

    // 设置表头行样式
    const headerCell = XLSX.utils.encode_cell({ r: 1, c: i })
    if (!ws[headerCell]) ws[headerCell] = { v: '' }
    ws[headerCell].s = {
      font: { bold: true },
      alignment: { horizontal: 'center', vertical: 'center' },
      fill: { type: 'pattern', patternType: 'solid', fgColor: { rgb: '90EE90' } },
      border: {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
    }
  }

  // 将工作表添加到工作簿
  XLSX.utils.book_append_sheet(wb, ws, '涉案财物管理')
  
  // 使用 xlsx-style 导出带样式的文件
  const wopts = { bookType: 'xlsx', bookSST: false, type: 'array' }
  const wbout = XLSX.write(wb, wopts)
  
  // 创建 Blob 对象
  const blob = new Blob([wbout], { type: 'application/octet-stream' })
  
  // 创建下载链接
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = '涉案财物管理模板.xlsx'
  
  // 触发下载
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
const handleFileChange = (file) => {
  console.log('上传文件', file)
}

</script>

<style>
</style>