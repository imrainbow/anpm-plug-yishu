<template>
  <div class="user-management">
    <div class="user-management-header">
      <el-button type="primary" :icon="Plus" @click="handleAddUser"
        >新增</el-button
      >
    </div>
    <div class="user-management-table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="created_at" label="创建时间">
          <template #default="scope">
            {{
              dayjs(scope.row.created_at * 1000).format("YYYY-MM-DD HH:mm:ss")
            }}
          </template>
        </el-table-column>
        <el-table-column prop="updated_at" label="更新时间">
          <template #default="scope">
            {{
              dayjs(scope.row.updated_at * 1000).format("YYYY-MM-DD HH:mm:ss")
            }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template #default="scope">
            <el-tooltip
              :content="
                scope.row.username === userName
                  ? '密码修改'
                  : '只能修改自己的密码'
              "
              placement="left"
            >
              <el-button
                :class="
                  scope.row.username === userName
                    ? 'circle-primary'
                    : 'circle-primary-disabled'
                "
                :icon="Edit"
                @click="handleEditClick(scope.row)"
                circle
              />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="queryData.page"
          v-model:page-size="queryData.pageSize"
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
    </div>
    <!-- 新增弹框 -->
    <el-dialog
      v-model="dialogVisible"
      title="注册用户"
      @closed="restForm"
      destroy-on-close
    >
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
          <el-input v-model="addUserForm.password" type="password" />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model="addUserForm.confirmPassword" type="password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="handleAddOk">确定</el-button>
        <el-button class="btn-cancel" @click="dialogVisible = false"
          >取消</el-button
        >
      </template>
    </el-dialog>
    <!-- 修改密码弹框 -->
    <el-dialog
      v-model="dialogVisibleEdit"
      @closed="restFormEdit"
      title="密码修改"
      destroy-on-close
    >
      <el-form
        ref="editUserFormRef"
        :model="editUserForm"
        :rules="editRitRules"
        label-width="90px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editUserForm.username" disabled />
        </el-form-item>
        <el-form-item label="旧密码" prop="old_password">
          <el-input v-model="editUserForm.old_password" type="password" />
        </el-form-item>
        <el-form-item label="新密码" prop="new_password">
          <el-input v-model="editUserForm.new_password" type="password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="primary" @click="handleEditOk">确定</el-button>
        <el-button class="btn-cancel" @click="dialogVisibleEdit = false"
          >取消</el-button
        >
      </template>
    </el-dialog>
    <!--  -->
  </div>
</template>
<script setup>
import { Plus, Edit } from '@element-plus/icons-vue'
import { addUser, getUserList, editPassword } from '@/api/user'
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs'
const userName = sessionStorage.getItem('userInfo')
import CryptoJS from 'crypto-js'
const dialogVisible = ref(false)
const addUserForm = ref({
  username: '',
  password: '',
  confirmPassword: '',
 
})
// 加密密钥，建议放在环境变量中
// MD5加密函数
const md5Encrypt = (text) => {
  return CryptoJS.MD5(text).toString().toLowerCase() // 确保输出小写
}
const editUserForm = ref({
  username: '',
  old_password: '',
  new_password: '',
})
const editUserFormRef = ref(null)
// 校验就密码不能和旧密码一致
const validateEditPass = (rule, value, callback) => {
  if (value === editUserForm.value.old_password) {
    callback(new Error('新密码不能和旧密码一致'))
  } else {
    callback()
  }
}
const editRitRules = reactive({
  old_password: [
    { required: true, message: '请输入旧密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
  ],
  new_password: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
    { validator: validateEditPass, trigger: 'blur' }
  ]
})
const dialogVisibleEdit = ref(false)


const queryData = ref({
  page: 1,
  pageSize: 10,
 
})
const tableData = ref([])
const total = ref(0)
const getTableData = async () => {
  const res = await getUserList(queryData.value)
  if (res.success) {
     tableData.value = res.data.list
    total.value = res.data.total
    
  }
 
}
const handleEditClick = (row) => {
  console.log(row)
  console.log(row.username,userName)
  if (row.username !== userName) {
    return
  }
  dialogVisibleEdit.value = true
  editUserForm.value = row

  
}
onMounted(() => {
  getTableData()
})
const handleSizeChange = (size) => {
  queryData.value.page = 1
  queryData.value.pageSize = size
  getTableData()
}
const handleCurrentChange = (pageNo) => {
  queryData.value.page = pageNo
  getTableData()
}

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
   
        const encryptedPassword = md5Encrypt(addUserForm.value.password)
     
        const res = await addUser({
          username: addUserForm.value.username,
          password: encryptedPassword
        })
        if (res.success) {
      ElMessage.success('注册用户成功')
      dialogVisible.value = false
      getTableData()
    
      
      } else {
        // ElMessage.error(res.message)
      }
     
    }
  })
}
const handleEditOk = async () => {
  await editUserFormRef.value.validate(async (valid) => {
    if (valid) {
      const encryptedOldPassword = md5Encrypt(editUserForm.value.old_password)
      const encryptedNewPassword = md5Encrypt(editUserForm.value.new_password)

      const res = await editPassword({
        
        old_password: encryptedOldPassword,
        new_password: encryptedNewPassword
      })
      if (res.success) {
        ElMessage.success('密码修改成功')
        dialogVisibleEdit.value = false
       
      } else {
        ElMessage.error(res.message)
      }
    }
  })
}
const restForm = () => {
  addUserForm.value = {
    username: '',
    password: '',
    confirmPassword: ''
  }
}
const restFormEdit = () => {

  editUserForm.value = {
    username: '',
    old_password: '',
    new_password: ''
  }
  editUserFormRef.value.resetFields()
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