<template>
  <div class="upload-records">
    <!-- 头部搜索 -->
    <!-- /头部搜索 -->
    <div class="card-body">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="文件名" />
        <el-table-column prop="size" label="所属模块" />
        <el-table-column prop="uploadTime" label="操作时间" />
        <el-table-column prop="uploadTime" label="操作类别" />
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="uploadTime" label="操作状态" />
      </el-table>
      <!-- /表格 -->
      <!-- 分页 -->
      <!-- /分页 -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAllLogs } from '@/api/system'

const tableData = ref([])
const total = ref(0)
const queryData = ref({
  page: 1,
  pageSize: 10,
})

const getTableData = async () => {
  const res = await getAllLogs(queryData.value)
  if(res.success) {
    tableData.value = res.data.logs
    total.value = res.data.total
  }
  console.log(res)
  // tableData.value = res.data
}

onMounted(() => {
  getTableData()
})
</script>

<style lang="less" scoped>
</style>