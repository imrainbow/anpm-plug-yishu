<template>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    default-active="2"
    text-color="#fff"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item index="1">
      <el-icon><setting /></el-icon>
      <span>文件上传</span>
    </el-menu-item>
    <el-menu-item index="2">
      <el-icon><setting /></el-icon>
      <span>上传记录</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {

}
</script>

<style>
</style>