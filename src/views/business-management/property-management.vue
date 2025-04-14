<template>
  <div class="property-management">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="案管部门" name="first">
        <CaseManagement />
      </el-tab-pane>
      <el-tab-pane label="财务部门" name="second">
        <FinanceDepartment />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CaseManagement from './components/case-management.vue'
import FinanceDepartment from './components/finacnce-department.vue'

const activeName = ref('first')
</script>

<style lang="less" scoped>
.property-management {
  padding: 20px;
}
</style>