<template>
  <div class="ai-help-container">
    <div class="ai-help-header">
      <div class="header-left">案件管理</div>
      <div class="header-right" @click="handleReturn">
        <img src="@/assets/return.png" alt="返回" />
      </div>
    </div>
    <div class="business-management-content" v-if="type == 1">
      <div id="ai-assist" class="content-section">
        <div class="card">
          <div class="card-body">
            <div class="card-body-content">
              <div class="module-card" @click="handleTableClick(1)">
                案管部门
              </div>

              <div class="module-card" @click="handleTableClick(2)">
                <div class="module-card-body">财物部门</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="business-management-content" v-else>
      <div id="ai-assist" class="content-section">
        <div class="card">
          <div class="card-body">
            <div class="card-body-content">
              <div class="module-card" @click="handleClick('/case-card')">
                查看表格
              </div>

              <div
                class="module-card"
                @click="handleClick('/statistical-chart')"
              >
                <div class="module-card-body">查看统计分析图</div>
              </div>
            </div>
          </div>
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