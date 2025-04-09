<template>
  <div class="login-container">
    <!-- 登录面板 -->
    <div class="login-box">
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入账号"
            :prefix-icon="User"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            :prefix-icon="Lock"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="login-button" @click="handleLogin"
        >登录</el-button
      >
    </div>
    <!-- /登录面板 -->
    <!-- logo标题 -->
    <div class="logo-title">
      <img src="@/assets/images/logo.png" alt="logo" />
      <span>黟数检光数智管理平台</span>
    </div>
    <!-- /logo标题 -->
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { login } from '@/api/user'
import store from '@/store'
const router = useRouter()
const loginFormRef = ref(null)

const loginForm = ref({
  username: '',
  password: ''
})
const rules = reactive({
  username: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
  ],
})
// 登录方法
const handleLogin = async () => {
  try {
    await loginFormRef.value.validate(async (valid) => {
      if (valid) {
        // 这里调用登录接口
        const res = await login({
          username: loginForm.value.username,
          password: loginForm.value.password
        })
        
        if (res.success) {
          ElMessage.success('登录成功')
          // 将token存入vuex
          const token = res.data.token
          store.commit('user/SET_TOKEN', token)

          // 登录成功后跳转到首页
          router.push('/dashboard')
        }
      }
    })
  } catch (error) {
    console.error('登录失败：', error)
  }
}

</script>

<style lang="less" scoped>
.login-container {
  height: 100vh;
  .login-box {
    padding: 30px;
    width: 420px;
    height: 350px;
    background-color: #fff;
    position: absolute;
    right: 10%;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  }
  .login-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .login-button {
      width: 100%;
      height: 52px;
      font-size: 22px;
    }
  }
  .logo-title {
    position: absolute;
    left: 40px;
    top: 40px;
    display: flex;
    align-items: center;
    img {
      width: 100px;
    }
    span {
      font-family: "AliHYAiHei";
      font-size: 30px;
      color: rgb(43, 170, 213);
      font-weight: 600;
    }
  }
}
</style>