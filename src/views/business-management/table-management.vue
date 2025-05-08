<!--  -->
<template>
  <div class="ai-help-container">
    <div class="business-management-content">
      <CaseManagement v-if="tableType == 1" />
      <!-- <FinanceDepartment v-else /> -->
    </div>
  </div>
</template>

<script setup>
import CaseManagement from './components/case-management.vue'
import FinanceDepartment from './components/finacnce-department.vue'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
const route = useRoute()
const tableType = route.query.tableType


</script>
<style scoped lang='scss'>
</style>