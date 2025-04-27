<template>
  <div class="ai-help-container card-page">
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
    ></iframe>
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