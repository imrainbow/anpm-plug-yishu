<template>
  <div class="ai-help-container">
    <div class="ai-help-header">
      <div class="header-left">检察办案</div>
      <div class="header-right" @click="handleReturn">
        <img src="@/assets/return.png" alt="返回" />
      </div>
    </div>
    <div class="ai-help-content">
      <div id="ai-assist" class="content-section">
        <div class="card">
          <div class="card-body">
            <div class="module-grid">
              <div class="module-card">
                <div class="module-card-header">
                  <i class="fas fa-robot"></i>
                  <h3>公益卫士数字检察云平台</h3>
                </div>
                <div class="module-card-body">
                  <p class="module-card-description">
                    公益卫士数字检察云平台集合检察办案全流程管理，提供专业的检察办案支持。
                  </p>
                  <a
                    href="https://chat.deepseek.com/"
                    target="_blank"
                    class="module-card-link"
                    >访问公益卫士数字检察云平台</a
                  >
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
</script>

<style lang="less" scoped>
</style>