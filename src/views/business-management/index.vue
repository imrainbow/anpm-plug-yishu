<template>
  <div class="ai-help-container">
    <div class="ai-help-header">
      <div class="header-left">案件管理</div>
      <div class="header-right" @click="handleReturn">
        <img src="@/assets/return.png" alt="返回" />
      </div>
    </div>
    <div class="business-management-content">
      <div id="ai-assist" class="content-section">
        <div class="card">
          <div class="card-body">
            <div class="card-body-content">
              <div class="module-card" @click="handleClick(1)">
                涉案财物管理
              </div>

              <div class="module-card" @click="handleClick(2)">
                <div class="module-card-body">案卡填录</div>
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

const router = useRouter();

const handleReturn = () => {
  router.back();
};
const handleClick = (type) => {
    // debugger
  router.push({
    path:'/property-management',
    query: {
      type
    }
  });
};
</script>

<style lang="less" scoped>
.business-management-content {
  margin-top: 20px;
  //   background-color: #f5f5f5;
  .card-body-content {
    display: flex;
    .module-card {
      width: 50%;
      height: 390px;
    }
    .module-card:first-child {
      margin-right: 40px;
    }
    .card-footer {
      display: flex;
      justify-content: space-around;
      a {
        width: 45%;
      }
    }
  }
}
</style>