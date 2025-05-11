vue
<template>
  <div
    class="page-header-common"
    :style="{ height: 80 * sizeRatio + 'px', fontSize: 33 * sizeRatio + 'px' }"
  >
    <slot></slot>
  </div>
  <!-- 返回按钮 -->
  <el-tooltip class="box-item" content="返回" placement="left">
    <img
      class="return-img"
      src="@/assets/return-circle.png"
      alt=""
      @click="handleReturn"
      :style="{ height: 25 * sizeRatio + 'px', top: 6 * sizeRatio + 'px' }"
    />
  </el-tooltip>
</template>

<script setup>
import { onMounted,ref,onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const handleReturn = () => {
  router.back();
};

const sizeRatio = ref(1)

// 计算尺寸比例的函数
const calculateSizeRatio = () => {
  sizeRatio.value = window.innerWidth / 1920;
};

// 添加窗口大小变化的事件监听器
const handleResize = () => {
  calculateSizeRatio();
};

onMounted(() => {
  // 初始计算
  calculateSizeRatio();
  
  // 添加窗口大小变化的事件监听器
  window.addEventListener('resize', handleResize);
});

// 组件卸载时移除事件监听器
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
});



</script>

<style lang="less" scoped>
.page-header-common {
  width: 100%;
  background-image: url("../assets/images/header.png");
  background-size: 100% 100%;
  background-position: center;
  //   background-color: rgba(0, 53, 127, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #61d3ff;

  font-weight: bold;
}
.return-img {
  position: fixed;
  // top: 5px;
  right: 30px;
  cursor: pointer;
  z-index: 1000;
  // height: 30px;
  &:hover {
    transform: scale(1.1);
  }
}
</style>