<template>
  <div class="box-container">
    <!-- 返回按钮 -->
    <PageTitle>{{ type == 1 ? "涉案财物管理" : "案卡填录" }}</PageTitle>

    <div class="page-bottom" v-if="type == 1">
      <div
        class="page-bottom-card"
        :style="{ fontSize: `${33 * sizeRatio}px` }"
        @click="handleTableClick(1)"
      >
        涉案财物填录
      </div>

      <!-- <div class="module-card" @click="handleTableClick(2)">财部门</div> -->
    </div>

    <div class="page-bottom" v-else>
      <div
        class="page-bottom-card"
        :style="{ fontSize: `${33 * sizeRatio}px` }"
        @click="handleClick('/case-card')"
      >
        查看表格
      </div>

      <div
        class="page-bottom-card"
        :style="{ fontSize: `${33 * sizeRatio}px` }"
        @click="handleClick('/statistical-chart')"
      >
        查看统计分析图
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'

import { useRouter, useRoute } from 'vue-router'
import PageTitle from '@/components/PageTitle.vue';
const route = useRoute()
const type = route.query.type



const router = useRouter()
const sizeRatio = ref(1)
onMounted(() => {
  sizeRatio.value = window.innerWidth / 1920
})


const handleTableClick = (tableType) => {
  router.push({
    path: '/table-management',
    query: {
      tableType
    }
  })
}


const handleClick = (path) => {
  router.push(path)
}
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