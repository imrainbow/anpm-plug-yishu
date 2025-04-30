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
        <el-table-column prop="entry" label="涉案物品入库" />
        <el-table-column prop="entry_time" label="入库时间">
          <template #default="scope">
            {{ formatTimestamp(scope.row.entry_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="exit" label="涉案物品出库" />
        <el-table-column prop="exit_time" label="出库时间">
          <template #default="scope">
            {{ formatTimestamp(scope.row.exit_time) }}
          </template>
        </el-table-column>
        <el-table-column prop="property_to" label="物品去向">
          <template #default="scope">
            {{
              scope.row.property_to
                ? scope.row.property_to === ""
                  ? "--"
                  : scope.row.property_to
                : "--"
            }}
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
        <el-table-column prop="funds_to" label="资金去向" />
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
    <el-dialog
      v-model="dialogVisible"
      :title="form.id ? '编辑' : '新增'"
      width="50%"
      @closed="handleResetForm"
    >
      <el-form :model="form" ref="formRef" :rules="rules" label-width="120px">
        <el-form-item label="案件名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入案件名称" />
        </el-form-item>

        <el-form-item label="涉案物品入库" prop="entry">
          <el-input v-model="form.entry" placeholder="请输入涉案物品入库" />
        </el-form-item>

        <el-form-item label="入库时间" prop="entry_time">
          <el-date-picker
            v-model="form.entry_time"
            placeholder="请选择入库时间"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            :clearable="true"
            :style="{ width: '100%' }"
          />
        </el-form-item>

        <el-form-item label="涉案物品出库" prop="exit">
          <el-input v-model="form.exit" placeholder="请输入涉案物品出库" />
        </el-form-item>

        <el-form-item label="出库时间" prop="exit_time">
          <el-date-picker
            v-model="form.exit_time"
            placeholder="请选择出库时间"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            :clearable="true"
            :style="{ width: '100%' }"
          />
        </el-form-item>
        <el-form-item label="物品去向" prop="property_to">
          <el-input v-model="form.property_to" placeholder="请输入物品去向" />
        </el-form-item>

        <el-form-item label="涉案款收入金额" prop="receive_amount">
          <el-input
            placeholder="请输入涉案款收入金额"
            v-model.number="form.receive_amount"
            :style="{ width: '100%' }"
          />
        </el-form-item>

        <el-form-item label="收入日期" prop="receive_time">
          <el-date-picker
            v-model="form.receive_time"
            placeholder="请选择收入日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            :clearable="true"
            :style="{ width: '100%' }"
          />
        </el-form-item>

        <el-form-item label="交款人" prop="receiver">
          <el-input v-model="form.receiver" placeholder="请输入交款人" />
        </el-form-item>

        <el-form-item label="涉案款支出金额" prop="pay_amount">
          <el-input
            placeholder="请输入涉案款支出金额"
            v-model.number="form.pay_amount"
            :style="{ width: '100%' }"
          />
        </el-form-item>

        <el-form-item label="支出日期" prop="pay_time">
          <el-date-picker
            v-model="form.pay_time"
            placeholder="请选择支出日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            :clearable="true"
            :style="{ width: '100%' }"
          />
        </el-form-item>

        <el-form-item label="资金去向" prop="funds_to">
          <el-input v-model="form.funds_to" placeholder="请输入资金去向" />
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
import { utils, writeFile } from 'xlsx'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getPropertyList, createProperty, editProperty, deleteProperty,batchCreateProperty } from '@/api/case-card'

const router = useRouter()
const page = ref({
  page: 1,
  page_size: 10,
  
})
const form = ref({
  name: '', // 案件名称
  entry: '', // 涉案物品入库
  entry_time: '', // 入库时间
  exit_time: '', // 出库时间
  property_to: '', //物品去向

  exit: '', // 物品名称
  receive_amount: '', // 收入金额
  receive_time: '', // 收入时间
  receiver: '', // 交款人
  pay_amount: '', // 支出金额
  pay_time: '', // 支出时间
  funds_to: '', // 支出原因
  remark: '' // 备注
})
const total = ref(0)
const tableData = ref([])
const loading = ref(false)
const dialogVisible = ref(false)
const formRef = ref(null)
const rules = {
  receive_amount: [
    { type: 'number', message: '请输入数字', trigger: 'blur' }
  ],
  pay_amount: [
    { type: 'number', message: '请输入数字', trigger: 'blur' }
  ]

}
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
      ElMessage.success('删除数据成功')
      getPropertyListAsync()
    }else {
      ElMessage.error(res.message)
    }
  } catch (error) {
    console.error('删除数据失败', error)  
  }
}
const handleSave = async() => {
  try {
    // 先进行表单验证
    await formRef.value.validate()
    
    if(!form.value.id){
      // 新增
      await createPropertyAsync()
    }else {
      // 编辑
      await editPropertyAsync()
    }
  } catch (error) {
    // 如果是验证错误，不需要额外处理，element-plus 会自动显示错误信息
    console.error('表单提交失败:', error)
    return
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
  // 定义表头
  const headers = [
    '案件名称',
    '涉案物品入库',
    '入库时间',
    '涉案物品出库',
    '出库时间',
    '物品去向',
    '涉案款入金额',
    '收入日期',
    '交款人',
    '涉案款支出金额',
    '支出日期',
    '资金去向',
    '备注'
  ]

  // 创建工作簿
  const wb = utils.book_new()
  
  // 创建工作表（只包含表头的空表格）
  const ws = utils.aoa_to_sheet([headers])
  
  // 设置列宽（根据内容自适应）
  const colWidths = headers.map(header => ({
    wch: Math.max(12, header.length * 2)  // 最小宽度12，根据文字长度适应
  }))
  ws['!cols'] = colWidths

  // 设置单元格样式
  const range = utils.decode_range(ws['!ref'])
  for (let C = range.s.c; C <= range.e.c; ++C) {
    const address = utils.encode_cell({ r: 0, c: C })
    if (!ws[address]) continue
    ws[address].s = {
      font: { bold: true },
      alignment: { horizontal: 'center', vertical: 'center' },
      border: {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' }
      }
    }
  }

  // 将工作表添加到工作簿
  utils.book_append_sheet(wb, ws, '涉案财物（案管部门）')

  // 生成并下载文件
  writeFile(wb, '涉案财物（案管部门）模版.xlsx')
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
const handleResetForm = () => {

  formRef.value.resetFields()
  form.value = {
    name: '', // 案件名称
    entry: '', // 涉案物品入库
    entry_time: '', // 入库时间
    exit_time: '', // 出库时间
    storage_time: '', // 存储时间
    exit: '', // 物品名称
    receive_amount: '', // 收入金额
    receive_time: '', // 收入时间 
    receiver: '', // 交款人
    pay_amount: '', // 支出金额
    pay_time: '', // 支出时间
    funds_to: '', // 支出原因
    remark: '' // 备注
  }
}
// 在 script setup 部分添加处理文件上传的函数
const handleFileChange = (file) => {
  try {
    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        // 读取Excel数据
        const data = e.target.result
        const workbook = XLSX.read(data, { 
          type: 'array',
          cellDates: true, // 将单元格日期解析为日期对象
          dateNF: 'yyyy-mm-dd' // 指定日期格式
        })
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]
        
        // 将Excel数据转换为JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 })
        
        // 定义字段映射
        const headers = [
          'name',           // 案件名称
          'entry',         // 涉案物品入库
          'entry_time',    // 入库时间
          'exit',          // 涉案物品出库
          'exit_time',     // 出库时间
          'property_to',   // 物品去向
          'receive_amount', // 涉案款入金额
          'receive_time',  // 收入日期
          'receiver',      // 交款人
          'pay_amount',    // 涉案款支出金额
          'pay_time',      // 支出日期
          'funds_to',      // 资金去向
          'remark'         // 备注
        ]
        
        // 跳过表头，处理数据行
        const processedData = jsonData.slice(1).map(row => {
          const item = {}
          headers.forEach((header, index) => {
            // 处理特殊字段
            if (['receive_amount', 'pay_amount'].includes(header)) {
              // 确保金额为数字
              item[header] = row[index] ? Number(row[index]) : null
            } else if (['entry_time', 'exit_time', 'receive_time', 'pay_time'].includes(header)) {
              // 处理日期格式，修复时区问题
              if (row[index]) {
                // 如果是Date对象，转换为正确的时间字符串
                if (row[index] instanceof Date) {
                  item[header] = dayjs(row[index]).format('YYYY-MM-DD')
                } else {
                  // 如果是字符串，直接使用
                  item[header] = row[index]
                }
              } else {
                item[header] = null
              }
            } else {
              // 其他字段
              item[header] = row[index] || ''
            }
          })
          return item
        })

        // 数据验证
        if (processedData.length === 0) {
          ElMessage.warning('Excel文件中没有数据')
          return
        }

        // 调用批量创建API
        const res = await batchCreateProperty(processedData)
        if (res.success) {
          ElMessage.success('数据导入成功')
          // 刷新表格数据
          getPropertyListAsync()
        } else {
          ElMessage.error(res.message || '数据导入失败')
        }
      } catch (error) {
        console.error('处理Excel文件失败：', error)
        ElMessage.error('处理Excel文件失败')
      }
    }
    
    // 开始读取文件
    reader.readAsArrayBuffer(file.raw)
  } catch (error) {
    console.error('文件上传失败：', error)
    ElMessage.error('文件上传失败')
  }
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