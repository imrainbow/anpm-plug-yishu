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
const size = ref('default')
const background = ref(true)
const disabled = ref(false)

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