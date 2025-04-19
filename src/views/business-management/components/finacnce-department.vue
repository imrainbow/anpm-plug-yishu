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
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="in_time" label="入库日期" min-width="150" />
        <el-table-column prop="in_amount" label="入库金额" min-width="120">
          <template #default="{ row }">
            {{ row.in_amount?.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="in_source" label="入库来源" min-width="120" />
        <el-table-column prop="out_time" label="出库日期" min-width="150" />
        <el-table-column prop="out_amount" label="出库金额" min-width="120">
          <template #default="{ row }">
            {{ row.out_amount?.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="out_to" label="出库去向" min-width="120" />
        <el-table-column prop="remarks" label="备注" min-width="150" />
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)"
              >编辑</el-button
            >
            <el-button type="danger" link @click="handleDelete(row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-model="dialogVisible" title="新增" width="30%">
      <el-form :model="form" label-width="80px">
        <el-form-item label="入库日期">
          <el-date-picker
            v-model="form.in_time"
            type="date"
            format="YYYY年MM月DD日"
            value-format="YYYY-MM-DD"
            placeholder="选择入库日期"
          />
        </el-form-item>
        <el-form-item label="入库金额">
          <el-input v-model="form.in_amount" />
        </el-form-item>
        <el-form-item label="入库来源">
          <el-input v-model="form.in_source" />
        </el-form-item>
        <el-form-item label="出库日期">
          <el-date-picker
            v-model="form.out_time"
            type="date"
            format="YYYY年MM月DD日"
            value-format="YYYY-MM-DD"
            placeholder="选择出库日期"
          />
        </el-form-item>
        <el-form-item label="出库金额">
          <el-input v-model="form.out_amount" />
        </el-form-item>
        <el-form-item label="出库去向">
          <el-input v-model="form.out_to" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remarks" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="handleSave">确定</el-button>
          <el-button class="btn-cancel" @click="dialogVisible = false"
            >取消</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Download, Upload, Plus } from '@element-plus/icons-vue'
import * as XLSX from 'xlsx'
import { useRouter } from 'vue-router'
import { createMoneyRecord, editMoneyRecord, deleteMoneyRecord,batchCreateMoneyRecord } from '@/api/case-card'

const router = useRouter()
const tableData = ref([])

// 添加错误处理
onMounted(() => {
  const originalErrorHandler = window.onerror
  window.onerror = function (msg, url, line, col, error) {
    if (msg.includes('ResizeObserver loop completed with undelivered notifications')) {
      return true // 忽略这个错误
    }
    if (originalErrorHandler) {
      return originalErrorHandler.apply(this, arguments)
    }
    return false
  }
})

const handleReturn = () => {
  router.back()
}
const handleDownloadTemplate = () => {
  // 创建工作簿
  const wb = XLSX.utils.book_new()
  
  // 定义表头数据
  const headers = [
    ['涉案款管理（财务部门）'],
    ['入库日期', '入库金额', '入库来源', '出库日期', '出库金额', '出库去向', '备注']
  ]
  
  // 创建工作表
  const ws = XLSX.utils.aoa_to_sheet(headers)
  
  // 设置单元格合并
  ws['!merges'] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: 6 } }  // 合并第一行的所有列
  ]
  
  // 设置列宽
  ws['!cols'] = [
    { wch: 15 }, // 入库日期
    { wch: 12 }, // 入库金额
    { wch: 12 }, // 入库来源
    { wch: 15 }, // 出库日期
    { wch: 12 }, // 出库金额
    { wch: 12 }, // 出库去向
    { wch: 20 }  // 备注
  ]

  // 设置行高
  ws['!rows'] = [
    { hpt: 30 }, // 第一行（标题）的高度
    { hpt: 25 }  // 第二行（表头）的高度
  ]

  // 设置单元格样式
  for (let i = 0; i <= 6; i++) {
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
      fill: { type: 'pattern', patternType: 'solid', fgColor: { rgb: 'E0F0E0' } },
      border: {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
    }
  }

  // 添加10行空白数据行，带有边框和浅绿色背景
  for (let r = 2; r < 12; r++) {
    for (let c = 0; c <= 6; c++) {
      const cell = XLSX.utils.encode_cell({ r, c })
      ws[cell] = { 
        v: '',
        s: {
          fill: { type: 'pattern', patternType: 'solid', fgColor: { rgb: 'F0FFF0' } },
          border: {
            top: { style: 'thin' },
            bottom: { style: 'thin' },
            left: { style: 'thin' },
            right: { style: 'thin' }
          }
        }
      }
    }
  }

  // 将工作表添加到工作簿
  XLSX.utils.book_append_sheet(wb, ws, '涉案款管理')
  
  // 导出文件
  const wopts = { bookType: 'xlsx', bookSST: false, type: 'array' }
  const wbout = XLSX.write(wb, wopts)
  
  // 创建Blob对象并下载
  const blob = new Blob([wbout], { type: 'application/octet-stream' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = '涉案款管理模板.xlsx'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
const handleFileChange = (file) => {
  console.log('上传文件', file)
}

const handleEdit = (row) => {
  // 编辑操作
  console.log('编辑行', row)
}

const handleDelete = (row) => {
  // 删除操作
  console.log('删除行', row)
}
// 弹框部分
const dialogVisible = ref(false)
const form = ref({
  in_time: '',
  in_amount: null,
  in_source: '',
  out_time: '',
  out_amount: null,
  out_to: '',
  remarks: ''
})
const handleSave = () => {
  console.log('保存', form.value)
  if(!form.value.id) {
    // 新增
    handleCreate()
  } else {
    // 编辑
    console.log('编辑')
  }
}
// 新增请求方法
const handleCreate = async () => {
  const res = await createMoneyRecord(form.value)
  console.log('新增', res)
}
// 编辑请求方法

// 弹框部分结束
</script>

<style lang="less" scoped>
.page-container {
  height: unset;
}
</style>