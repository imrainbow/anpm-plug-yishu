vue
<template>
  <div
    class="page-header-common"
    :style="{ height: 80 * sizeRatio + 'px', fontSize: 24 * sizeRatio + 'px' }"
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
    />
  </el-tooltip>
</template>

<script setup>
import { onMounted,ref} from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const handleReturn = () => {
  router.back();
};

const sizeRatio = ref(1)
onMounted(() => {
  sizeRatio.value = window.innerWidth / 1920
})



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
  color: #fff;

  font-weight: bold;
}
.return-img {
  position: fixed;
  top: 5px;
  right: 30px;
  cursor: pointer;
  z-index: 1000;
  height: 30px;
  &:hover {
    transform: scale(1.1);
  }
}
</style>