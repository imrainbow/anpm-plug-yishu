<template>
  <div class="ai-help-container">
    <div class="ai-help-header">
      <div class="header-left">案卡管理 / 统计图表</div>
      <div class="header-right" @click="handleReturn">
        <img src="@/assets/return.png" alt="返回" />
      </div>
    </div>
    <div class="ai-help-content">
      <div id="ai-assist" class="content-section">
        <div class="card-body" style="margin: 0">
          <div class="module-grid-statistical">
            <!-- 开始 -->
            <div class="module-card">
              <div class="module-card-header">
                <i class="fas fa-robot"></i>
                <h3>案件类型</h3>
              </div>
              <div class="module-card-body">
                <EchartsCard :echartsData="caseTypeStatistic" />
              </div>
            </div>
            <!-- /结束 -->
            <div class="module-card">
              <div class="module-card-header">
                <i class="fas fa-robot"></i>
                <h3>承办部门</h3>
              </div>
              <div class="module-card-body">
                <EchartsCard :echartsData="departmentStatistic" />
              </div>
            </div>
            <div class="module-card">
              <div class="module-card-header">
                <i class="fas fa-robot"></i>
                <h3>承办检察官</h3>
              </div>
              <div class="module-card-body">
                <EchartsCard :echartsData="lawyerStatistic" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'; 
import { getCaseTypeStatistic, getDepartmentStatistic, getLawyerStatistic } from '@/api/case-card';
import { ref, onMounted } from 'vue';
import EchartsCard from './components/echartsCard.vue';
const router = useRouter();

const caseTypeStatistic = ref([]);
const departmentStatistic = ref([]);
const lawyerStatistic = ref([]);

const getCaseTypeStatisticData = async () => {
  const res = await getCaseTypeStatistic();
  if(res.success){
    caseTypeStatistic.value = res.data.map(item => ({
      label: item.case_type,
      value: item.count
    }));
  }
};

const getDepartmentStatisticData = async () => {
  const res = await getDepartmentStatistic();
  if(res.success){
    departmentStatistic.value = res.data.map(item => ({
      label: item.handling_dept,
      value: item.count
    }));
  }
};

const getLawyerStatisticData = async () => {
  const res = await getLawyerStatistic();
  if(res.success){
    lawyerStatistic.value = res.data.map(item => ({
      label: item.prosecutor,
      value: item.count
    }));
  }
};

onMounted(() => {
  getCaseTypeStatisticData();
  getDepartmentStatisticData();
  getLawyerStatisticData();
});










const handleReturn = () => {
  router.back();
};
</script>

<style lang="less" scoped>
.module-card-header {
  padding: 10px !important;
}
.ai-help-container {
  background-color: #f5f8fc;
  padding: 20px;
  height: 100vh;
  box-sizing: border-box;
  .ai-help-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 80px;
    background-color: #fff;
    height: 80px;
    border-radius: 6px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); // 添加柔和的阴影效果
    .header-right {
      img {
        height: 30px;
      }
    }
    .header-left {
      font-size: 24px;
      font-weight: bold;
    }
  }
}
.ai-help-content {
  margin-top: 20px;
}
.module-card {
  width: 49%;
  margin-bottom: 20px;
}
.module-grid-statistical {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.module-card {
  height: 400px;
}
</style>