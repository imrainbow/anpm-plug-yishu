<template>
  <div class="file-upload">
    <div class="file-upload-header">
      <el-button type="primary" :icon="UploadFilled">上传</el-button>
    </div>
    <div class="file-upload-content">
      <!-- 文件列表 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" label="序号" />
        <el-table-column prop="name" label="标题" />
        <el-table-column prop="size" label="模块" />
        <el-table-column prop="type" label="描述" />
        <el-table-column prop="type" label="操作" />
      </el-table>
      <!-- /文件列表 -->
      <!-- 分页 -->
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script setup>
import { UploadFilled } from '@element-plus/icons-vue'


</script>

<style lang="less" scoped>
.file-upload-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>