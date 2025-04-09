<template>
  <div class="user-management">
    <div class="user-management-header">
      <el-button type="primary" :icon="UploadFilled" @click="handleAddUser"
        >新增</el-button
      >
    </div>
    <!-- 新增弹框 -->
    <el-dialog v-model="dialogVisible" title="账号注册" destroy-on-close>
      <el-form
        ref="addUserFormRef"
        :model="addUserForm"
        :rules="rules"
        label-width="90px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addUserForm.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="addUserForm.confirmPassword" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="handleAddOk">确定</el-button>
        <el-button class="btn-cancel" @click="dialogVisible = false"
          >取消</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { UploadFilled } from '@element-plus/icons-vue'
import { addUser } from '@/api/user'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
const dialogVisible = ref(false)
const addUserForm = ref({
  username: '',
  password: '',
  confirmPassword: '',
 
})
// 自定义校验密码是否一致
const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== addUserForm.value.password) {
    callback(new Error('两次输入密码不一致!'))
  } else {
    callback()
  }
}
const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    { validator: validatePass, trigger: 'blur' }
  ]
})
const addUserFormRef = ref(null)
const handleAddUser = () => {
  console.log('新增')
  dialogVisible.value = true
}
const handleAddOk = async () => {
  // 添加表单校验
  await addUserFormRef.value.validate(async (valid) => {
    if (valid) {
     
        const res = await addUser({
          username: addUserForm.value.username,
          password: addUserForm.value.password
        })
        if (res.success) {
      ElMessage.success('注册用户成功')
      dialogVisible.value = false
      } else {
        // ElMessage.error(res.message)
      }
     
    }
  })
}
</script>

<style lang="less" scoped>
.user-management-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>