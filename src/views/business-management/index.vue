<template>
  <div class="box-container">
    <PageTitle>案件管理</PageTitle>
    <div class="page-bottom">
      <div class="page-bottom-card" @click="handleClick(1)">涉案财物管理</div>
      <div class="page-bottom-card" @click="handleClick(2)">案卡填录</div>
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
      background: rgba(0, 40, 100, 0.3);
      border: 1px solid rgba(97, 211, 255, 0.3);
      box-shadow: 0 0 30px rgba(0, 150, 255, 0.2);
      transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
      overflow: hidden;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
          130deg,
          rgba(0, 212, 255, 0.1) 0%,
          rgba(0, 100, 200, 0.05) 100%
        );
        box-shadow: inset 0 0 50px rgba(97, 211, 255, 0.2);
        border-radius: 12px;
        z-index: -1;
      }

      &::after {
        content: "";
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(
          to bottom right,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0.05) 50%,
          rgba(255, 255, 255, 0) 100%
        );
        transform: rotate(30deg);
        z-index: 1;
        transition: transform 0.7s;
      }

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
