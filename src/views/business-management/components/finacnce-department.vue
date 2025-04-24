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
        <el-table-column prop="in_time" label="入库日期" min-width="150">
          <template #default="{ row }">
            {{ formatTimestamp(row.in_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="in_amount" label="入库金额" min-width="120">
          <template #default="{ row }">
            {{ row.in_amount?.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="in_source" label="入库来源" min-width="120">
          <template #default="{ row }">
            {{ row.in_source === "" ? "--" : row.in_source }}
          </template>
        </el-table-column>
        <el-table-column prop="out_time" label="出库日期" min-width="150">
          <template #default="{ row }">
            {{ formatTimestamp(row.out_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="out_amount" label="出库金额" min-width="120">
          <template #default="{ row }">
            {{ row.out_amount?.toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column prop="out_to" label="出库去向" min-width="120">
          <template #default="{ row }">
            {{ row.out_to === "" ? "--" : row.out_to }}
          </template>
        </el-table-column>
        <el-table-column prop="remarks" label="备注" min-width="150">
          <template #default="{ row }">
            {{ row.remarks === "" ? "--" : row.remarks }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
          <template #default="scope">
            <el-button
              class="circle-primary"
              :icon="Edit"
              @click="handleEditClick(scope.row)"
              circle
            />

            <el-button
              type="danger"
              :icon="Delete"
              @click="handleDeleteClick(scope.row)"
              circle
            />
          </template>
        </el-table-column>
      </el-table>
      <div v-if="total > 0" class="pagination-container">
        <el-pagination
          v-model:current-page="page.page"
          v-model:page-size="page.page_size"
          :page-sizes="[10, 20, 50, 100, 200]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <el-dialog
      v-model="dialogVisible"
      :title="form.id ? '编辑' : '新增'"
      width="50%"
      @closed="restForm"
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="入库日期">
          <el-date-picker
            style="width: 100%"
            v-model="form.in_time"
            type="date"
            format="YYYY年MM月DD日"
            value-format="YYYY-MM-DD"
            placeholder="选择入库日期"
          />
        </el-form-item>
        <el-form-item label="入库金额" prop="in_amount">
          <el-input v-model.number="form.in_amount" />
        </el-form-item>
        <el-form-item label="入库来源">
          <el-input v-model="form.in_source" />
        </el-form-item>
        <el-form-item label="出库日期">
          <el-date-picker
            style="width: 100%"
            v-model="form.out_time"
            type="date"
            format="YYYY年MM月DD日"
            value-format="YYYY-MM-DD"
            placeholder="选择出库日期"
          />
        </el-form-item>
        <el-form-item label="出库金额" prop="out_amount">
          <el-input v-model.number="form.out_amount" />
        </el-form-item>
        <el-form-item label="出库去向">
          <el-input v-model="form.out_to" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remarks" type="textarea" rows="3" />
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
import { Download, Upload, Plus, Edit, Delete } from '@element-plus/icons-vue'
import * as XLSX from 'xlsx'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { ElMessage, ElMessageBox } from 'element-plus'
import {getMoneyList, createMoneyRecord, editMoneyRecord, deleteMoneyRecord,batchCreateMoneyRecord } from '@/api/case-card'

const router = useRouter()
const tableData = ref([])
const page = ref({
  page: 1,
  page_size: 10
})
const formRef = ref(null)
const total = ref(0)
const rules = {
  in_amount: [
    { type: 'number', message: '请输入数字', trigger: 'blur' }
  ],
  out_amount: [
    { type: 'number', message: '请输入数字', trigger: 'blur' }
  ]
}
const formatTimestamp = (timestamp) => {
  if (!timestamp) return '--'
  return dayjs(timestamp).format('YYYY-MM-DD')
}

const getMoneyListAsync = async () => {
  try {
    const res = await getMoneyList(page.value)
    if (res.success) {
      tableData.value = res.data.records
       total.value = res.data.total
    }
  } catch (error) {
    console.error('获取涉案款列表失败', error)
  }
 }
const handleCurrentChange = (pageNo) => {
  page.value.page = pageNo
  getMoneyListAsync()
}

const handleSizeChange = (pageSize) => {
  page.value.page = 1
  page.value.page_size = pageSize
  getMoneyListAsync()
}
const handleEditClick = (row) => {
  dialogVisible.value = true
  console.log('编辑', row)
  let dataCopy = JSON.parse(JSON.stringify(row))
  form.value = dataCopy
}
const deleteMoneyRecordAsync = async (id) => {
  try {
    const res = await deleteMoneyRecord(id)
    if (res.success) {
      ElMessage.success('删除数据成功')
      getMoneyListAsync()
    } else {
      ElMessage.error(res.message)
    }
  } catch (error) {
    console.error('删除数据失败', error)
  }
}
const handleDeleteClick = (row) => {
  ElMessageBox.confirm('确定删除该数据吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  }).then(() => {
    deleteMoneyRecordAsync(row.id)
  })
}
// 添加错误处理
onMounted(() => {
  getMoneyListAsync()
  
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
    ['入库日期', '入库金额', '入库来源', '出库日期', '出库金额', '出库去向', '备注']
  ]
  
  // 创建工作表
  const ws = XLSX.utils.aoa_to_sheet(headers)
  
  // 设置列宽
  ws['!cols'] = [
    { wch: 15 }, // 入库日期
    { wch: 12 }, // 入库金额
    { wch: 12 }, // 入库来源
    { wch: 15 }, // 出库日期
    { wch: 12 }, // 出库金额
    { wch: 12 }, // 出库去向
    { wch: 15 }  // 备注
  ]

  // 设置单元格样式
  const range = XLSX.utils.decode_range(ws['!ref'])
  for(let C = range.s.c; C <= range.e.c; C++) {
    const cell_ref = XLSX.utils.encode_cell({r: 0, c: C})
    if(!ws[cell_ref]) continue
    
    // 设置表头样式
    ws[cell_ref].s = {
      fill: {
        fgColor: { rgb: "000000" }, // 黑色背景
        patternType: "solid"
      },
      font: {
        color: { rgb: "FFFFFF" }, // 白色文字
        bold: true
      },
      alignment: {
        horizontal: "center",
        vertical: "center"
      }
    }
  }

  // 将工作表添加到工作簿
  XLSX.utils.book_append_sheet(wb, ws, '涉案款管理')
  
  // 导出文件
  const wopts = { 
    bookType: 'xlsx', 
    bookSST: false, 
    type: 'array',
    cellStyles: true // 启用单元格样式
  }
  
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
// 格式化Excel日期
function formatExcelDate2(value) {
  if (!value) return ''
  
  try {
    // 处理字符串日期格式 (YYYY/MM/DD 或 YYYY-MM-DD)
    if (typeof value === 'string') {
      // 替换所有的'/'为'-'以统一格式
      const normalizedDate = value.replace(/\//g, '-')
      const date = dayjs(normalizedDate)
      if (date.isValid()) {
        return date.format('YYYY-MM-DD')
      }
    }
    // 处理Excel数字日期格式
    else if (typeof value === 'number') {
      // Excel的日期是从1900年1月1日开始的天数
      const excelDate = XLSX.SSF.parse_date_code(value)
      const date = new Date(Date.UTC(excelDate.y, excelDate.m - 1, excelDate.d))
      return dayjs(date).format('YYYY-MM-DD')
    }
    return value
  } catch (e) {
    console.error('日期格式化错误:', e)
    return 'Invalid Date'
  }
}


// 处理文件上传
const handleFileChange = (file) => {
  try {
    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const data = e.target.result
        const workbook = XLSX.read(data, { 
          type: 'array',
          cellDates: true, // 将单元格日期解析为日期对象
          dateNF: 'yyyy-mm-dd' // 指定日期格式
        })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        
        // 获取数据范围
        const range = XLSX.utils.decode_range(worksheet['!ref'])
        const rows = []
        
        // 从第二行开始读取数据（跳过表头）
        for(let R = 1; R <= range.e.r; R++) {
          let hasData = false
          
          // 读取每个单元格的数据
          const cellData = {
            in_time: '',
            in_amount: '',
            in_source: '',
            out_time: '',
            out_amount: '',
            out_to: '',
            remarks: ''
          }

          // 读取并格式化每列数据
          const inTimeCell = worksheet[XLSX.utils.encode_cell({r: R, c: 0})]
          if(inTimeCell) {
            cellData.in_time = formatExcelDate2(inTimeCell.v)
            hasData = true
          }

          const inAmountCell = worksheet[XLSX.utils.encode_cell({r: R, c: 1})]
          if(inAmountCell) {
            cellData.in_amount = Number(inAmountCell.v)
            hasData = true
          }

          const inSourceCell = worksheet[XLSX.utils.encode_cell({r: R, c: 2})]
          if(inSourceCell) {
            cellData.in_source = String(inSourceCell.v).trim()
            hasData = true
          }

          const outTimeCell = worksheet[XLSX.utils.encode_cell({r: R, c: 3})]
          if(outTimeCell) {
            cellData.out_time = formatExcelDate(outTimeCell.v)
            hasData = true
          }

          const outAmountCell = worksheet[XLSX.utils.encode_cell({r: R, c: 4})]
          if(outAmountCell) {
            cellData.out_amount = Number(outAmountCell.v)
            hasData = true
          }

          const outToCell = worksheet[XLSX.utils.encode_cell({r: R, c: 5})]
          if(outToCell) {
            cellData.out_to = String(outToCell.v).trim()
            hasData = true
          }

          const remarksCell = worksheet[XLSX.utils.encode_cell({r: R, c: 6})]
          if(remarksCell) {
            cellData.remarks = String(remarksCell.v).trim()
            hasData = true
          }

          if(hasData) {
            // 构建符合API要求的数据格式
            const formattedRow = {
              in_time: cellData.in_time,
              in_amount: cellData.in_amount || null,
              in_source: cellData.in_source,
              out_time: cellData.out_time,
              out_amount: cellData.out_amount || null,
              out_to: cellData.out_to,
              remarks: cellData.remarks
            }
            
            // 验证日期格式是否有效
            if (formattedRow.in_time === 'Invalid Date' || formattedRow.out_time === 'Invalid Date') {
              ElMessage.error(`第${R + 1}行：日期格式不正确`)
              return
            }
            
            rows.push(formattedRow)
          }
        }

        if (rows.length === 0) {
          ElMessage.warning('Excel文件中没有有效数据')
          return
        }

        console.log('处理后的数据:', rows)

        const res = await batchCreateMoneyRecord(rows)
        if (res.success) {
          ElMessage.success('数据导入成功')
          getMoneyListAsync()
        } else {
          ElMessage.error(res.message || '数据导入失败')
        }

      } catch (error) {
        console.error('处理Excel文件失败：', error)
        ElMessage.error('处理Excel文件失败')
      }
    }
    
    reader.readAsArrayBuffer(file.raw)
  } catch (error) {
    console.error('文件上传失败：', error)
    ElMessage.error('文件上传失败')
  }
}

// 格式化Excel日期
function formatExcelDate(value) {
  if (!value) return ''
  
  try {
    if (typeof value === 'number') {
      // 处理Excel数字日期
      return dayjs(XLSX.SSF.parse_date_code(value)).format('YYYY-MM-DD HH:mm:ss')
    } else if (typeof value === 'string') {
      // 处理字符串日期
      const date = dayjs(value)
      if (date.isValid()) {
        return date.format('YYYY-MM-DD HH:mm:ss')
      }
    }
    return value
  } catch (e) {
    console.error('日期格式化错误:', e)
    return value
  }
}
const restForm = () => {
  formRef.value.resetFields()
  form.value = {
    in_time: '',
    in_amount: null,
    in_source: '',
    out_time: '',
    out_amount: null,
    out_to: '',
    remarks: ''
  }

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
const handleSave = async() => {
  try {
    // 先进行表单验证
    await formRef.value.validate()
    console.log('保存', form.value)
  if(!form.value.id) {
    // 新增
    handleCreate()
  } else {
    // 编辑
    console.log('编辑')
    handleEdit()
  }
  } catch (error) {
    // 如果是验证错误，不需要额外处理，element-plus 会自动显示错误信息
    console.error('表单提交失败:', error)
    return
  }

  
}
// 编辑请求方法
const handleEdit = async () => {
  const res = await editMoneyRecord(form.value)
  if(res.success) {
    dialogVisible.value = false
    getMoneyListAsync()
    ElMessage.success('编辑成功')
  }
  console.log('编辑', res)
}
// 新增请求方法
const handleCreate = async () => {
  const res = await createMoneyRecord(form.value)
  if(res.success) {
    dialogVisible.value = false
    getMoneyListAsync()
    ElMessage.success('新增成功')
  }
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