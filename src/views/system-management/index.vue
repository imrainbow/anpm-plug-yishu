<template>
  <el-container>
    <el-header>
      <div class="header-left">
        <img class="logo-img" src="@/assets/images/logo.png" alt="logo" />
        <img class="logo-text" src="@/assets/logo-text.png" alt="logo-text" />
      </div>
      <div class="header-right">
        <img
          class="return-img"
          @click="handleReturn"
          src="@/assets/return.png"
          alt="avatar"
        />
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <SideBar />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import SideBar from './components/sideBar.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const handleReturn = () => {
  console.log('返回');
  router.push('/dashboard');
}
</script>
<style lang="less" scoped>
.header-left {
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 30px;
  .logo-img {
    height: 50px;
  }
  .logo-text {
    height: 30px;
    margin-left: 10px;
  }
}
.header-right {
  .return-img {
    height: 30px;
    margin-right: 10px;
    cursor: pointer;
  }
}
</style>

