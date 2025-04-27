<template>
  <div
    class="ai-help-container card-page"
    v-loading="loading"
    element-loading-text="加载中..."
  >
    <el-tooltip class="box-item" content="返回" placement="left">
      <img
        class="return-img"
        src="@/assets/return-circle.png"
        alt=""
        @click="handleReturn"
      />
    </el-tooltip>

    <iframe
      src="https://law.wkinfo.com.cn/"
      width="100%"
      height="100%"
      frameborder="0"
      @load="handleIframeLoad"
    ></iframe>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const loading = ref(true);

const handleReturn = () => {
  router.back();
};
const handleIframeLoad = () => {
  loading.value = false;
};
</script>

<style lang="less" scoped>
.card-page {
  background-color: #fff;
}
</style>