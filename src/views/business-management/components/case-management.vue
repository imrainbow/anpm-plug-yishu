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
      <el-table :data="tableData" border height="calc(100vh - 280px)">
        <template #empty>
          <div class="empty-table">
            <img class="empty-img" src="@/assets/no-data.png" alt="" />
            <div class="empty-text">暂无数据</div>
          </div>
        </template>
        <el-table-column
          prop="name"
          label="案件名称"
          min-width="120"
          fixed="left"
        />
        <el-table-column label="涉案财物管理（案管部门）" align="center">
          <el-table-column prop="entry" label="涉案物品入库" min-width="120" />
          <el-table-column prop="entry_time" label="入库时间" min-width="90">
            <template #default="scope">
              {{ formatTimestamp(scope.row.entry_time) }}
            </template>
          </el-table-column>
          <el-table-column prop="exit" label="涉案物品出库" min-width="120" />
          <el-table-column prop="exit_time" label="出库时间" min-width="90">
            <template #default="scope">
              {{ formatTimestamp(scope.row.exit_time) }}
            </template>
          </el-table-column>
          <el-table-column prop="property_to" label="物品去向" min-width="90">
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
          <el-table-column
            prop="receive_amount"
            label="涉案款收入金额"
            min-width="130"
          >
            <template #default="scope">
              {{ formatMoney(scope.row.receive_amount) }}
            </template>
          </el-table-column>
          <el-table-column prop="receive_time" label="收入日期" min-width="90">
            <template #default="scope">
              {{ formatTimestamp(scope.row.receive_time) }}
            </template>
          </el-table-column>
          <el-table-column prop="receiver" label="交款人" min-width="90" />
          <el-table-column
            prop="pay_amount"
            label="涉案款支出金额"
            min-width="130"
          >
            <template #default="scope">
              {{ formatMoney(scope.row.pay_amount) }}
            </template>
          </el-table-column>
          <el-table-column prop="pay_time" label="支出日期" min-width="90">
            <template #default="scope">
              {{ formatTimestamp(scope.row.pay_time) }}
            </template>
          </el-table-column>
          <el-table-column prop="funds_to" label="资金去向" min-width="90" />
          <el-table-column prop="remark" label="案管备注" min-width="150" />
        </el-table-column>
        <el-table-column label="涉案款管理（财物部门）" align="center">
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
          <el-table-column prop="remarks" label="财物备注" min-width="150">
            <template #default="{ row }">
              {{ row.remarks === "" ? "--" : row.remarks }}
            </template>
          </el-table-column>
        </el-table-column>
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
      <div class="case-management-pagination" v-if="total > 0">
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

        <el-form-item label="案管备注" prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入备注"
            :rows="3"
          />
        </el-form-item>
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
        <el-form-item label="财务备注">
          <el-input v-model="form.remarks" type="textarea" rows="3" />
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
  remark: '', // 备注
  in_time: '',
    in_amount: null,
    in_source: '',
    out_time: '',
    out_amount: null,
    out_to: '',
    remarks: ''
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
  // 多行表头内容（完全对齐截图，无空行空列）
  const aoa = [
    [
      '案件名称',
      '涉案财物物管理（案管部门）', '', '', '', '', '', '', '', '', '', '', '', '',
      '涉案款管理（财务部门）', '', '', '', '', '', '', ''
    ],
    [
      '案件名称', '涉案物品入库', '入库时间', '涉案物品出库', '出库时间', '物品去向',
      '涉案款收入金额', '收入日期', '交款人', '涉案款支出金额', '支出日期', '资金去向', '案管备注',
      '入库日期', '入库金额', '入库来源', '出库日期', '出库金额', '出库去向', '财务备注'
    ]
  ];
  // 生成空数据行
  for (let i = 0; i < 10; i++) aoa.push(Array(20).fill(''));

  // 创建工作表
  const ws = utils.aoa_to_sheet(aoa);

  // 合并单元格
  ws['!merges'] = [
    // “案件名称”两行合并 A1:A2
    { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },
    // “涉案财物物管理（案管部门）” B1:N1
    { s: { r: 0, c: 1 }, e: { r: 0, c: 13 } },
    // “涉案款管理（财务部门）” O1:U1
    { s: { r: 0, c: 14 }, e: { r: 0, c: 20 } }
  ];

  // 绿色背景（涉案财物物管理）
  for (let c = 1; c <= 13; c++) {
    ws[utils.encode_cell({ r: 0, c })].s = {
      fill: { fgColor: { rgb: 'C6EFCE' } },
      font: { bold: true },
      alignment: { horizontal: 'center', vertical: 'center' }
    };
  }
  // 橙色背景（涉案款管理）
  for (let c = 14; c <= 20; c++) {
    ws[utils.encode_cell({ r: 0, c })].s = {
      fill: { fgColor: { rgb: 'FFD966' } },
      font: { bold: true },
      alignment: { horizontal: 'center', vertical: 'center' }
    };
  }
  // 一级表头左侧（案件名称）白底
  ws[utils.encode_cell({ r: 0, c: 0 })].s = {
    font: { bold: true },
    alignment: { horizontal: 'center', vertical: 'center' }
  };
  // 二级表头全加粗、居中、边框
  for (let c = 0; c <= 19; c++) {
    const cell = ws[utils.encode_cell({ r: 1, c })];
    if (cell) {
      cell.s = {
        font: { bold: true },
        alignment: { horizontal: 'center', vertical: 'center' },
        border: {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        }
      };
      // 黄色高亮（如需可自定义更多字段）
      if (c === 6) { // “涉案款收入金额”
        cell.s.fill = { fgColor: { rgb: 'FFFF00' } };
      }
    }
  }

  // 设置列宽
  ws['!cols'] = Array(20).fill({ wch: 14 });

  // 生成工作簿
  const wb = utils.book_new();
  utils.book_append_sheet(wb, ws, '案件模版');

  // 下载
  writeFile(wb, '案件导入模版.xlsx');
};
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