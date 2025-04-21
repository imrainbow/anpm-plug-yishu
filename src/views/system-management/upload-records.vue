<template>
  <div class="upload-records">
    <!-- 头部搜索 -->
    <!-- /头部搜索 -->
    <div class="card-body">
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="username" label="用户名" />

        <el-table-column prop="updated_at" label="操作时间">
          <template #default="scope">
            {{
              dayjs(scope.row.updated_at * 1000).format("YYYY-MM-DD HH:mm:ss")
            }}
          </template>
        </el-table-column>
        <el-table-column prop="operation_type" label="操作类别">
          <template #default="scope">
            {{ operationType[scope.row.operation_type] || "--" }}
          </template>
        </el-table-column>
        <el-table-column prop="detail" label="操作说明" />
        <el-table-column prop="error" label="错误日志">
          <template #default="scope">
            {{ scope.row.error || "--" }}
          </template>
        </el-table-column>
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
import dayjs from 'dayjs'

const tableData = ref([])
const total = ref(0)
const queryData = ref({
  page: 1,
  pageSize: 10,
})
const size = ref('default')
const background = ref(true)
const disabled = ref(false)
const operationType = ref({
  "login": "登录",
  "logout": "登出",
  "upload": "上传",
  "download": "下载",
  "delete": "删除",
  "modify": "修改",
  "add": "新增",
  "query": "查询",
  "export": "导出",
  "import": "导入",
  "register": "注册",
  "other": "其他",
})
const handleSizeChange = (size) => {
  queryData.value.page = 1
  queryData.value.pageSize = size
  getTableData()
}
const handleCurrentChange = (page) => {
  queryData.value.page = page
  getTableData()
}
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