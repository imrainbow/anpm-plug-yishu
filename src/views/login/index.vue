<template>
  <div class="login-container">
    <!-- 背景动效 -->
    <!-- <div class="bg-container">
      <div class="circle-container">
        <div class="circle circle-1"></div>
        <div class="circle circle-2"></div>
        <div class="circle circle-3"></div>
      </div>
      <div class="grid-container"></div>
    </div> -->

    <!-- 登录面板 -->
    <div class="login-box">
      <h2 class="login-title">欢迎登录</h2>
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
            type="password"
            :prefix-icon="Lock"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" class="login-button" @click="handleLogin">
        登录
      </el-button>
    </div>

    <!-- logo标题 -->
    <div class="logo-title">
      <img class="logo-img" src="@/assets/images/logo.png" alt="logo" />
      <span class="gradient-text">黟数检光数智管理平台</span>
    </div>
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
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' }
  ]
})
// 登录方法
const handleLogin = async () => {
  sessionStorage.setItem('userInfo', loginForm.value.username)
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
  width: 100vw;
  position: relative;
  // background: linear-gradient(135deg, #1a2b3c 0%, #0d1b2a 100%);
  background: url("@/assets/login-bg3.jpg") no-repeat center center;
  background-size: cover;
  overflow: hidden;

  // 背景动效容器
  .bg-container {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;

    // 圆形光环效果
    .circle-container {
      position: absolute;
      width: 100%;
      height: 100%;

      .circle {
        position: absolute;
        border-radius: 50%;
        border: 2px solid rgba(32, 128, 255, 0.2);

        &::after {
          content: "";
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border-radius: 50%;
          border: 2px solid transparent;
          border-top-color: #2080ff;
          animation: rotate 10s linear infinite;
        }
      }

      .circle-1 {
        width: 800px;
        height: 800px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      .circle-2 {
        width: 600px;
        height: 600px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        &::after {
          animation-duration: 7s;
        }
      }

      .circle-3 {
        width: 400px;
        height: 400px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        &::after {
          animation-duration: 5s;
        }
      }
    }

    // 网格背景
    .grid-container {
      position: absolute;
      width: 200%;
      height: 200%;
      top: -50%;
      left: -50%;
      background-image: linear-gradient(
          rgba(32, 128, 255, 0.1) 1px,
          transparent 1px
        ),
        linear-gradient(90deg, rgba(32, 128, 255, 0.1) 1px, transparent 1px);
      background-size: 20px 20px;
      transform: perspective(500px) rotateX(45deg);
      animation: grid-move 15s linear infinite;
    }
  }

  // 登录框样式优化
  .login-box {
    // padding: 40px;
    // width: 420px;
    background: rgba(240, 238, 238, 0.3);
    backdrop-filter: blur(10px);
    position: absolute;
    // right: 10%;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 15px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    z-index: 2;

    .login-title {
      color: #fff;
      font-size: 28px;
      text-align: center;
      margin-bottom: 30px;
    }

    :deep(.el-input) {
      .el-input__wrapper {
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: none;

        input {
          color: #fff;
          &::placeholder {
            color: rgba(255, 255, 255, 0.6);
          }
        }
      }
    }

    .login-button {
      width: 100%;
      height: 52px;
      font-size: 22px;
      background: linear-gradient(90deg, #2080ff, #80b3ff);
      border: none;
      margin-top: 20px;

      &:hover {
        background: linear-gradient(90deg, #1a6cd4, #6a9ee6);
      }
    }
  }

  // logo标题样式优化
  .logo-title {
    position: absolute;
    left: 40px;
    top: 40px;
    display: flex;
    align-items: center;
    z-index: 2;

    .logo-img {
      height: 50px;
      filter: drop-shadow(0 0 10px rgba(32, 128, 255, 0.5));
    }
    .title-img {
      height: 35px;
      margin-left: 10px;
    }
    .gradient-text {
      font-family: "AliHYAiHei";
      font-size: 30px;
      background: linear-gradient(to right, #fff, rgb(97, 211, 255));
      // color: #fff;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;

      margin-left: 15px;
      font-weight: 700;
    }

    // span {
    //   font-family: "AliHYAiHei";
    //   font-size: 30px;
    //   color: #fff;
    //   text-shadow: 0 0 10px rgba(32, 128, 255, 0.5);
    // }
  }
}
/* 大屏幕 */
@media screen and (min-width: 1920px) {
  .login-box {
    width: 420px;
    padding: 50px;
    right: 7%;
    padding: 40px;
  }
}

/* 普通桌面屏幕 */
@media screen and (max-width: 1440px) {
  .login-box {
    padding: 30px;
    width: 400px;
    right: 6%;
  }
}

/* 小屏幕桌面或平板 */
@media screen and (max-width: 1200px) {
  .login-box {
    padding: 30px;
    width: 360px;
    padding: 30px;
    right: 5%;
  }
}

/* 平板竖屏或大手机 */
@media screen and (max-width: 768px) {
  .login-box {
    padding: 30px;
    width: 90%;
    right: 50%;
    transform: translateX(50%);
    margin: 0 auto;
  }
}

/* 手机屏幕 */
@media screen and (max-width: 480px) {
  .login-box {
    width: 95%;
    padding: 20px;
    right: 50%;
    transform: translateX(50%);
  }
}

// 动画关键帧
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes grid-move {
  from {
    transform: perspective(500px) rotateX(45deg) translateY(0);
  }
  to {
    transform: perspective(500px) rotateX(45deg) translateY(20px);
  }
}
</style>