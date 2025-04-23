<template>
  <div class="file-upload">
    <div class="file-upload-header">
      <el-button type="primary" :icon="UploadFilled" @click="uploadClick"
        >上传</el-button
      >
    </div>
    <div class="file-upload-content">
      <!-- 文件列表 -->
      <el-table :data="tableData" style="width: 100%" :loading="loading">
        <el-table-column type="index" label="序号" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="menu_id" label="模块">
          <template #default="scope">
            {{ formatModalName(scope.row.menu_id) }}
          </template>
        </el-table-column>
        <el-table-column prop="file_name" label="文件名字" />
        <el-table-column prop="created_at" label="上传时间">
          <template #default="scope">
            {{ formatTimestamp(scope.row.created_at) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-button
              type="danger"
              :icon="Delete"
              @click="handleDeleteClick(scope.row)"
              circle
            />
          </template>
        </el-table-column>
      </el-table>
      <!-- /文件列表 -->
      <!-- 分页 -->
      <div v-if="total > 0" class="pagination-container">
        <el-pagination
          v-model:current-page="page.page"
          v-model:page-size="page.page_size"
          :page-sizes="[10, 20, 50, 100, 200]"
          :size="size"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <!-- /分页 -->
    </div>
    <!-- 上传文件弹框 -->
    <el-dialog
      v-model="dialogVisible"
      title="上传文件"
      width="50%"
      @closed="handleClose"
    >
      <el-form :model="form" :rules="rules" ref="formRef" label-width="90px">
        <el-form-item label="标题" placeholder="请输入标题" prop="title">
          <el-input v-model="form.title" />
        </el-form-item>
        <el-form-item label="选择模块" prop="menu_id">
          <el-tree-select
            v-model="form.menu_id"
            :data="modalOptions"
            :render-after-expand="true"
            :props="defaultProps"
          />
        </el-form-item>

        <el-form-item label="选择文件" prop="file">
          <el-upload
            class="upload-demo"
            action="#"
            :auto-upload="false"
            :on-change="handleFileChange"
            :before-upload="beforeUpload"
            :limit="1"
            accept=".ppt,.pptx"
            ref="uploadRef"
          >
            <template #trigger>
              <el-button type="primary">选择文件</el-button>
            </template>
            <template #tip>
              <div class="el-upload__tip">只能上传 PPT 文件，且不超过 50MB</div>
            </template>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button
          type="primary"
          @click="handleSubmit"
          :loading="submitLoading"
        >
          {{ submitLoading ? "上传中" : "上传" }}</el-button
        >
        <el-button class="btn-cancel" @click="dialogVisible = false"
          >取消</el-button
        >
      </template>
    </el-dialog>
    <!-- /上传文件弹框  -->
  </div>
</template>

<script setup>
import { UploadFilled, Delete } from '@element-plus/icons-vue'
import { ref ,onMounted} from 'vue'
import { getPptMenuList } from '@/api/ppt-menu'
import { getPptMenuListNotTree } from '@/api/ppt-menu'
import { uploadFillFile, getFillFileList, deleteFillFile, updateFillFile } from '@/api/fill-upload'
import { ElMessage, ElMessageBox } from 'element-plus'
import { initMenu } from '@/api/user'

const dialogVisible = ref(false)
const menuList = ref([])
const form = ref({
  title: '',
  menu_id: '',
  file: ''
})
const tableData = ref([])
const loading = ref(false)
const submitLoading = ref(false)
const page = ref({
  page: 1,
  page_size: 10
})
const total = ref(0)
const size = ref('default')
const background = ref(true)
const disabled = ref(false)

// 格式化时间戳为年月日
const formatTimestamp = (timestamp) => {
  if (!timestamp) return '—'
  
  // 如果是秒级时间戳，转换为毫秒级
  const ms = String(timestamp).length === 10 ? timestamp * 1000 : timestamp
  
  const date = new Date(ms)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  
  return `${year}-${month}-${day}`
}
const formatModalName = (menu_id) => {
  const menuObj= menuList.value.find(item => item.id == menu_id)
  if(menuObj){
    if(menuObj.parent_id == 0){
      return menuObj.name
    }else{
      const parentMenu = menuList.value.find(item => item.id == menuObj.parent_id)
      if(parentMenu){
        return `${parentMenu.name} / ${menuObj.name}`
      }else{
        return menuObj.name
      }
    }

  }else return '--'
    
}

//  删除文件处理函数
const handleDeleteClick = (row) => {
  ElMessageBox.confirm(
    '确定要删除此文件吗？删除后不可恢复',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(async () => {
      try {
        // 调用删除API
        const res = await deleteFillFile(row.id)
        
        if (res.success) {
          ElMessage({
            type: 'success',
            message: '删除成功',
          })
          // 刷新文件列表
          getFillFileListAsync()
        } else {
          ElMessage({
            type: 'error',
            message: res.message || '删除失败',
          })
        }
      } catch (error) {
        console.error('删除文件失败:', error)
        ElMessage({
          type: 'error',
          message: '删除操作失败',
        })
      }
    })
    .catch(() => {
      // 用户取消删除操作
      ElMessage({
        type: 'info',
        message: '已取消删除',
      })
    })
}
// 获取文件列表
const getFillFileListAsync = async() => {
  loading.value = true
  const res = await getFillFileList(page.value)
  // console.log(res)
  total.value = res.data.total
  tableData.value = res.data.files || []
  loading.value = false
}
// 页码改变时的处理函数
const handleCurrentChange = (newPage) => {
  page.value.page = newPage
  getFillFileListAsync()
}

// 每页显示条数改变时的处理函数
const handleSizeChange = (newSize) => {
  page.value.page_size = newSize
  // 更改每页条数后，页码重置为1
  page.value.page = 1
  getFillFileListAsync()
}

const getPptMenuListNotTreeAsync = async() => {
  const res = await getPptMenuListNotTree()
  menuList.value = res.data
}
onMounted(async() => {
  const res = await initMenu()
   await getPptMenuListNotTreeAsync()
  
  await getFillFileListAsync()
 
  
})
// 表单校验规则
const rules = {
  title: [
    { required: true, message: '请输入标题', trigger: 'change' },
    
  ],
  menu_id: [
    { required: true, message: '请选择模块', trigger: 'change' }
  ],
 
  file: [
  { 
      required: true, 
      message: '请选择文件', 
      trigger: 'change',
      validator: (rule, value, callback) => {
        if (fileList.value.length === 0) {
          callback(new Error('请选择文件'))
        } else {
          callback()
        }
      }
    }
  ]
}
const fileList = ref([])
const formRef = ref(null)
// 模块选择下拉框配置
const modalOptions = ref([])
const defaultProps = {
  children: 'children',
  label: 'name',
  value: 'id'
}

// 上传前验证
const beforeUpload = (file) => {

  const isPPT = file.type === 'application/vnd.ms-powerpoint' || 
                file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
  const isLt50M = file.size / 1024 / 1024 < 50

  if (!isPPT) {
    ElMessage.error('只能上传 PPT 文件!')
    return false
  }
  if (!isLt50M) {
    ElMessage.error('文件大小不能超过 50MB!')
    return false
  }
  return true
}

// 文件选择变化时的处理
const handleFileChange = (file) => {
  fileList.value = [file]
  form.value.file = file.raw

  // 如果标题为空，则使用文件名作为标题
  if (form.value.title == '') {
    // 获取文件名（不包含扩展名）
    const fileName = file.name.replace(/\.[^/.]+$/, '')
    form.value.title = fileName
  }
}

// 上传按钮点击事件
// 提交表单
const handleSubmit = async () => {
  // 验证表单

  submitLoading.value = true
  try {
    const valid = await formRef.value.validate()
    if(valid) {
      await handleUploadAsync()

    }
   
   
    
    
  } catch (error) {
    console.error('表单验证失败', error)
  } finally {
    submitLoading.value = false
  }
}
const handleUploadAsync = async() => {
  // 创建 FormData 对象
  const formData = new FormData()
  
  // 添加文件
  if (fileList.value.length > 0) {
    const file = fileList.value[0].raw  // 使用 raw 属性获取原始文件对象
    formData.append('file', file)
  } else {
    ElMessage.error('请选择文件')
    return
  }

  // 添加标题
  formData.append('title', form.value.title)
  
  // 添加菜单ID（从form.module获取，因为我们之前用tree-select选择的就是menu_id）
  formData.append('menu_id', form.value.menu_id)

  try {
    const res = await uploadFillFile(formData)
    console.log(res)
    if (res.success) {
      ElMessage.success('上传成功')
      dialogVisible.value = false
    
      getFillFileListAsync()
    } else {
      ElMessage.error(res.message || '上传失败')
    }
  } catch (error) {
    console.error('上传失败', error)
    ElMessage.error('上传失败')
  }
}
const uploadRef = ref(null)
// 关闭对话框时重置表单
const handleClose = () => {
  formRef.value?.resetFields()
  fileList.value = []
  uploadRef.value?.clearFiles()
  form.value = {
    title: '',
    menu_id: '',
   
    file: ''
  }
  dialogVisible.value = false
}
const getPptMenuListAsync = async() => {
  const res = await getPptMenuList()
  modalOptions.value = res.data
 
}
const uploadClick = async() => {
  await getPptMenuListAsync()
  dialogVisible.value = true
}

</script>

<style lang="less" scoped>
.file-upload-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
/* 添加以下 loading 相关样式 */
.custom-loading {
  .circular {
    width: 18px;
    height: 18px;
    animation: loading-rotate 2s linear infinite;
  }

  .path {
    stroke: #fff;
    stroke-linecap: round;
    animation: loading-dash 1.5s ease-in-out infinite;
  }
}

@keyframes loading-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-dash {
  0% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}
</style>