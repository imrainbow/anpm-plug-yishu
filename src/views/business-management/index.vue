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
              <div class="module-card">
                <div class="module-card-header">
                  <i class="fas fa-robot"></i>
                  <h3>涉案财物管理</h3>
                </div>
                <div class="module-card-body">
                  <p class="module-card-description">
                    提供涉案财物的登记、保管、处置等全流程管理。
                  </p>
                  <a
                    href="javascript:;"
                    class="module-card-link"
                    @click="handleClick('/property-management')"
                    >查看表格</a
                  >
                </div>
              </div>

              <div class="module-card">
                <div class="module-card-header">
                  <i class="fas fa-robot"></i>
                  <h3>案卡填录</h3>
                </div>
                <div class="module-card-body">
                  <p class="module-card-description">
                    提供案件基本信息的录入和管理功能。
                  </p>
                  <div class="card-footer">
                    <a
                      href="javascript:;"
                      class="module-card-link"
                      @click="handleClick('/case-card')"
                      >查看表格</a
                    >
                    <a
                      href="javascript:;"
                      class="module-card-link"
                      @click="handleClick('/statistical-chart')"
                      >查看统计分析图</a
                    >
                  </div>
                </div>
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
const handleClick = (path) => {
    // debugger
  router.push(path);
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