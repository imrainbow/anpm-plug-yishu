<template>
  <div class="ai-help-container card-page">
    <!-- 返回按钮 -->
    <el-tooltip class="box-item" content="返回" placement="left">
      <img
        class="return-img"
        src="@/assets/return-circle.png"
        alt=""
        @click="handleReturn"
      />
    </el-tooltip>
    <div class="card-body" v-if="type == 1">
      <div class="card-body-content">
        <div class="module-card" @click="handleTableClick(1)">案管部门</div>

        <div class="module-card" @click="handleTableClick(2)">财物部门</div>
      </div>
    </div>

    <div class="card-body" v-else>
      <div class="card-body-content">
        <div class="module-card" @click="handleClick('/case-card')">
          查看表格
        </div>

        <div class="module-card" @click="handleClick('/statistical-chart')">
          查看统计分析图
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CaseManagement from './components/case-management.vue'
import FinanceDepartment from './components/finacnce-department.vue'
import { useRouter, useRoute } from 'vue-router'
const route = useRoute()
const type = route.query.type


const router = useRouter()

const handleReturn = () => {
  router.back()
}
const handleTableClick = (tableType) => {
  router.push({
    path: '/table-management',
    query: {
      tableType
    }
  })
}


const handleClick = (path) => {
  router.push(path)
}
</script>

<style lang="less" scoped>
.property-management {
  padding: 20px;
}
</style>