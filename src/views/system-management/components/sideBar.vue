<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#1a3873"
    class="el-menu-vertical-demo"
    :default-active="activeMenu"
    text-color="#fff"
    router
  >
    <el-menu-item
      v-for="item in menuList"
      :key="item.path"
      :index="`/system-management/${item.path}`"
    >
      <el-icon><component :is="item.icon || 'Document'" /></el-icon>
      <span>{{ item.meta.title }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { Document, Upload, User, List } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { systemManagementRoutes } from '@/router'

const router = useRouter()
const route = useRoute()
const menuList = ref(systemManagementRoutes.map(route => ({
  ...route,
  icon: getIcon(route.path)
})))

const activeMenu = ref('/system-management/file-upload')

// 根据路由路径返回对应的图标
function getIcon(path) {
  const iconMap = {
    'file-upload': 'Upload',
    'upload-records': 'List',
    'user-management': 'User'
  }
  return iconMap[path] || 'Document'
}

onMounted(() => {
  router.push('/system-management/file-upload')
})
</script>

<style lang="less" scoped>
.el-menu {
  height: 100%;
  border-right: none;
}
</style>