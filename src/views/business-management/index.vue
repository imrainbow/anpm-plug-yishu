<template>
  <div class="box-container">
    <PageTitle>案件管理</PageTitle>
    <div class="page-bottom">
      <div
        class="page-bottom-card"
        :style="{ fontSize: `${33 * sizeRatio}px` }"
        @click="handleClick(1)"
      >
        涉案财物管理
      </div>
      <div
        class="page-bottom-card"
        :style="{ fontSize: `${33 * sizeRatio}px` }"
        @click="handleClick(2)"
      >
        案卡填录
      </div>
    </div>

    <!-- <div class="">
      <div class="card-body">
        <div class="card-body-content">
          <div class="module-card" @click="handleClick(1)">涉案财物管理</div>

          <div class="module-card" @click="handleClick(2)">案卡填录</div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import PageTitle from '@/components/PageTitle.vue';
import {ref,onMounted} from 'vue'

const router = useRouter();

const sizeRatio = ref(1)
onMounted(() => {
  sizeRatio.value = window.innerWidth / 1920
})

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
.box-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(to bottom, #001440, #002a80);
  overflow: hidden;

  .page-bottom {
    flex: 1;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 0 10%;

    .page-bottom-card {
      width: 30%;
      height: 45%;
      position: relative;
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #61d3ff;
      font-size: 22px;
      font-weight: bold;
      background: rgba(73, 147, 251, 0.1);
      box-shadow: inset 0px 0px 40px 0px rgba(108, 200, 255, 0.5);
      border: 1px solid rgba(97, 211, 255, 0.3);
      transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
      overflow: hidden;

      .card-text {
        position: relative;
        z-index: 2;
      }

      &:hover {
        transform: translateY(-5px) scale(1.03);
        box-shadow: 0 15px 35px rgba(0, 150, 255, 0.3);
        color: #fff;
        border-color: rgba(97, 211, 255, 0.6);

        &::after {
          transform: rotate(30deg) translate(10%, 10%);
        }
      }

      &:active {
        transform: translateY(0) scale(0.98);
        box-shadow: 0 5px 15px rgba(0, 150, 255, 0.2);
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .box-container .page-bottom {
    flex-direction: column;

    .page-bottom-card {
      width: 80%;
      height: 40%;
      margin-bottom: 20px;
    }
  }
}
</style>
