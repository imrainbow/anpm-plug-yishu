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
      <el-icon><Upload /></el-icon>
      <span>{{ item.meta.title }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { Upload, Document } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()
const route = useRoute()
const menuList = ref([])
const activeMenu = ref('/system-management/file-upload')
onMounted(() => {
  router.push('/system-management/file-upload')
  const parentRoute = router.options.routes.find(route => route.path === '/system-management')
  if (parentRoute && parentRoute.children) {
    // 获取所有子路由
    menuList.value = parentRoute.children.map(child => ({
      path: child.path,
      name: child.name,
      meta: child.meta,
      // 可以根据需要添加更多信息
    }))
    console.log('子路由列表：', menuList.value)
  }
})


</script>

<style lang="less" scoped>
.el-menu {
  height: 100%;
  border-right: none;
}
</style>