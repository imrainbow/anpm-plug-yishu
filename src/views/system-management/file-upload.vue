<template>
  <div class="file-upload">
    <div class="file-upload-header">
      <el-button type="primary" :icon="UploadFilled" @click="uploadClick"
        >上传</el-button
      >
    </div>
    <div class="file-upload-content">
      <!-- 文件列表 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" />
        <el-table-column prop="name" label="标题" />
        <el-table-column prop="size" label="模块" />

        <el-table-column prop="type" label="操作" />
      </el-table>
      <!-- /文件列表 -->
      <!-- 分页 -->
    </div>
    <!-- 上传文件弹框 -->
    <el-dialog v-model="dialogVisible" title="上传文件" width="50%">
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
        <el-button type="primary" @click="handleSubmit">上传</el-button>
        <el-button class="btn-cancel" @click="dialogVisible = false"
          >取消</el-button
        >
      </template>
    </el-dialog>
    <!-- /上传文件弹框  -->
  </div>
</template>

<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { getPptMenuList } from '@/api/ppt-menu'
import { uploadFillFile } from '@/api/fill-upload'
import { ElMessage } from 'element-plus'

const dialogVisible = ref(false)
const form = ref({
  title: '',
  menu_id: '',
  file: ''
})
// 表单校验规则
const rules = {
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    
  ],
  module: [
    { required: true, message: '请选择模块', trigger: 'change' }
  ],
 
  file: [
    { required: true, message: '请选择文件', trigger: 'change' }
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

  // 如果标题为空，则使用文件名作为标题
  if (form.value.title === '') {
    // 获取文件名（不包含扩展名）
    const fileName = file.name.replace(/\.[^/.]+$/, '')
    form.value.title = fileName
  }
}
// 上传按钮点击事件
// 提交表单
const handleSubmit = async () => {
  if (!formRef.value) return
  
  try {
    await handleUploadAsync()
   
    
    
  } catch (error) {
    console.error('表单验证失败', error)
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
      handleClose()  // 重置表单
    } else {
      ElMessage.error(res.message || '上传失败')
    }
  } catch (error) {
    console.error('上传失败', error)
    ElMessage.error('上传失败')
  }
}
// 关闭对话框时重置表单
const handleClose = () => {
  formRef.value?.resetFields()
  fileList.value = []
  form.value = {
    title: '',
    module: '',
    description: '',
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
</style>