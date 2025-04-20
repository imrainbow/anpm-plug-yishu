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
      <el-table :data="tableData" border>
        <el-table-column prop="name" label="案件名称" />
        <el-table-column prop="property_type" label="涉案物品入库" />
        <el-table-column prop="entry_time" label="入库时间">
          <template #default="scope">
            {{ formatTimestamp(scope.row.entry_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="property_name" label="涉案物品出库" />
        <el-table-column prop="storage_time" label="出库时间">
          <template #default="scope">
            {{ formatTimestamp(scope.row.storage_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="exit_time" label="物品去向">
          <template #default="scope">
            {{ formatTimestamp(scope.row.exit_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="receive_amount" label="涉案款收入金额">
          <template #default="scope">
            {{ formatMoney(scope.row.receive_amount) }}
          </template>
        </el-table-column>
        <el-table-column prop="receive_time" label="收入日期">
          <template #default="scope">
            {{ formatTimestamp(scope.row.receive_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="receiver" label="交款人" />
        <el-table-column prop="pay_amount" label="涉案款支出金额">
          <template #default="scope">
            {{ formatMoney(scope.row.pay_amount) }}
          </template>
        </el-table-column>
        <el-table-column prop="pay_time" label="支出日期">
          <template #default="scope">
            {{ formatTimestamp(scope.row.pay_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="pay_reason" label="资金去向" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column label="操作" width="110" fixed="right">
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
      <div class="case-management-pagination">
        <el-pagination
          v-model:current-page="page.page"
          v-model:page-size="page.page_size"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
        />
      </div>
    </div>

    <!-- 新增弹窗 -->
    <el-dialog v-model="dialogVisible" title="新增" width="50%">
      <el-form :model="form" ref="formRef" :rules="rules">
        <el-form-item label="案件名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入案件名称" />
        </el-form-item>

        <el-form-item label="涉案物品入库" prop="property_type">
          <el-input
            v-model="form.property_type"
            placeholder="请输入涉案物品入库"
          />
        </el-form-item>

        <el-form-item label="入库时间" prop="entry_time">
          <el-date-picker
            v-model="form.entry_time"
            s
            placeholder="请选择入库时间"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            :clearable="true"
            :style="{ width: '100%' }"
          />
        </el-form-item>

        <el-form-item label="物品名称" prop="property_name">
          <el-input v-model="form.property_name" placeholder="请输入物品名称" />
        </el-form-item>

        <el-form-item label="出库时间" prop="storage_time">
          <el-date-picker
            v-model="form.storage_time"
            placeholder="请选择出库时间"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            :clearable="true"
            :style="{ width: '100%' }"
          />
        </el-form-item>

        <el-form-item label="收入金额" prop="receive_amount">
          <el-input-number
            v-model="form.receive_amount"
            :precision="2"
            :step="0.01"
            :min="0"
            :style="{ width: '100%' }"
          />
        </el-form-item>

        <el-form-item label="收入时间" prop="receive_time">
          <el-date-picker
            v-model="form.receive_time"
            placeholder="请选择收入时间"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            :clearable="true"
            :style="{ width: '100%' }"
          />
        </el-form-item>

        <el-form-item label="交款人" prop="receiver">
          <el-input v-model="form.receiver" placeholder="请输入交款人" />
        </el-form-item>

        <el-form-item label="支出金额" prop="pay_amount">
          <el-input-number
            v-model="form.pay_amount"
            :precision="2"
            :step="0.01"
            :min="0"
            :style="{ width: '100%' }"
          />
        </el-form-item>

        <el-form-item label="支出时间" prop="pay_time">
          <el-date-picker
            v-model="form.pay_time"
            placeholder="请选择支出时间"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            :clearable="true"
            :style="{ width: '100%' }"
          />
        </el-form-item>

        <el-form-item label="支出原因" prop="pay_reason">
          <el-input v-model="form.pay_reason" placeholder="请输入支出原因" />
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入备注"
            :rows="3"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="handleSave">确定</el-button>
        <el-button class="btn-cancel" @click="dialogVisible = false"
          >取消</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref , onMounted} from 'vue'
import { Download, Upload, Plus, Edit, Delete } from '@element-plus/icons-vue'
import * as XLSX from 'xlsx'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getPropertyList, createProperty, editProperty, deleteProperty } from '@/api/case-card'

const router = useRouter()
const page = ref({
  page: 1,
  page_size: 10,
  
})
const form = ref({
  name: '', // 案件名称
  property_type: '', // 涉案物品入库
  entry_time: '', // 入库时间
  exit_time: '', // 出库时间
  storage_time: '', // 存储时间
  property_name: '', // 物品名称
  receive_amount: '', // 收入金额
  receive_time: '', // 收入时间
  receiver: '', // 交款人
  pay_amount: '', // 支出金额
  pay_time: '', // 支出时间
  pay_reason: '', // 支出原因
  remark: '' // 备注
})
const total = ref(0)
const tableData = ref([])
const loading = ref(false)
const dialogVisible = ref(false)
// 格式化时间戳
const formatTimestamp = (timestamp) => {
  if (!timestamp) return '--'
  return dayjs(timestamp).format('YYYY-MM-DD')
}


// 格式化金额
const formatMoney = (amount) => {
  if (!amount && amount !== 0) return '--'
  return Number(amount).toFixed(2)
}
const getPropertyListAsync = async () => {
  try {
    loading.value = true
     const res = await getPropertyList(page.value)
    if(res.success){
      
    tableData.value = res.data.list
    total.value = res.data.total  

    }
   
  } catch (error) {
    console.error('获取涉案财物列表失败', error)
  }
}
const deletePropertyAsync = async (id) => {
  try {
    const res = await deleteProperty(id)
    if(res.success){
      ElMessage.success('删除涉案财物成功')
      getPropertyListAsync()
    }else {
      ElMessage.error(res.message)
    }
  } catch (error) {
    console.error('删除涉案财物失败', error)  
  }
}
const handleSave = () => {
  if(!form.value.id){
    // 新增
    createPropertyAsync()
  }else {
    // 编辑
    editPropertyAsync()
  }
}
const createPropertyAsync = async () => {
  try {
    const res = await createProperty(form.value)
    if(res.success){
      ElMessage.success('新增涉案财物成功')
      dialogVisible.value = false
      getPropertyListAsync()
    }
  } catch (error) {
    console.error('新增涉案财物失败', error)
  }
}
const editPropertyAsync = async () => {
  try {
    const res = await editProperty(form.value)
    if(res.success){
      ElMessage.success('编辑涉案财物成功')
      dialogVisible.value = false
      getPropertyListAsync()
    }else {
      ElMessage.error(res.message)
    }
  } catch (error) {
    console.error('编辑涉案财物失败', error)
  }
}
onMounted(() => {
  getPropertyListAsync()
})

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
const handleEditClick = (row) => {
  dialogVisible.value = true
  console.log('编辑', row)
  let dataCopy = JSON.parse(JSON.stringify(row))
  form.value = dataCopy
}
const handleDeleteClick = (row) => {
  ElMessageBox.confirm('确定删除该涉案财物吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  }).then(() => {
    deletePropertyAsync(row.id)
  })
}

</script>

<style lang="less" scoped>
.case-management-pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
.case-management-table {
  background-color: #fff;
  padding: 20px;
}
</style>