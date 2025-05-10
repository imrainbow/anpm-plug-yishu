<template>
  <div class="box-container">
    <PageTitle> AI辅助</PageTitle>
    <div class="ai-container">
      <div class="flex-container">
        <div
          class="card"
          v-for="item in aiTools"
          :key="item.name"
          @click="handleCardClick(item)"
        >
          <div class="card-content">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import PageTitle from '@/components/PageTitle.vue';

const router = useRouter();

const aiTools = [
  { name: 'Deepseek', url: 'https://chat.deepseek.com/' },
  { name: '豆包', url: 'https://www.doubao.com/' },
  { name: 'Kimi', url: 'https://kimi.moonshot.cn/' },
  { name: '即梦', url: 'https://jimeng.jianying.com/' },
  { name: '可灵', url: 'https://app.klingai.com/cn/' },
  { name: '天工', url: 'https://www.tiangong.cn/' },
  { name: 'Aippt', url: 'https://www.aippt.cn/' },
  { name: 'Processon', url: 'https://www.processon.com/' },
  { name: '纳米ai', url: 'https://www.n.cn/' },
];

const handleCardClick = (item) => {
  window.open(item.url, '_blank');
};
const handleReturn = () => {
  router.back();
};
</script>

<style lang="less" scoped>
.return-img {
  position: fixed;
  top: 20px;
  right: 30px;
  cursor: pointer;
  z-index: 1000;
  height: 40px;
  &:hover {
    transform: scale(1.1);
  }
}
.ai-container {
  flex: 1;

  padding: 40px 80px; // 增加左右内边距
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
  gap: 40px; // 增加卡片之间的间距
  margin: 0 auto;
}

.card {
  flex: 0 0 calc(33.333% - 27px); // 调整宽度计算以适应新的间距
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
.card-content {
  padding: 40px;
  width: 100%;
  height: 90px;
  box-shadow: inset 0px 0px 40px 0px rgba(108, 200, 255, 0.5);
  background: rgba(73, 147, 251, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

// 响应式设计
@media screen and (max-width: 1200px) {
  .ai-container {
    padding: 40px;
  }
}

@media screen and (max-width: 768px) {
  .card {
    flex: 0 0 calc(50% - 20px); // 在较小屏幕上每行显示2个
  }
}

@media screen and (max-width: 480px) {
  .card {
    flex: 0 0 100%; // 在最小屏幕上每行显示1个
  }
  .ai-container {
    padding: 20px;
  }
}
</style>