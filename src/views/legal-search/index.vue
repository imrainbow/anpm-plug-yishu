<template>
  <div class="ai-help-container">
    <div class="ai-help-header">
      <div class="header-left">法律检索</div>
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
                  <h3>威科先行</h3>
                </div>
                <div class="module-card-body">
                  <p class="module-card-description">
                    威科先行是专业的法律知识服务平台，拥有丰富的法律法规、案例和期刊资源。
                  </p>
                  <a
                    href="https://law.wkinfo.com.cn/"
                    target="_blank"
                    class="module-card-link"
                    >访问威科先行</a
                  >
                </div>
              </div>

              <div class="module-card">
                <div class="module-card-header">
                  <i class="fas fa-robot"></i>
                  <h3>北大法宝</h3>
                </div>
                <div class="module-card-body">
                  <p class="module-card-description">
                    北大法宝提供法律法规、司法案例、法学期刊等专业法律检索服务。
                  </p>
                  <a
                    href="https://www.pkulaw.com/"
                    target="_blank"
                    class="module-card-link"
                    >访问北大法宝</a
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