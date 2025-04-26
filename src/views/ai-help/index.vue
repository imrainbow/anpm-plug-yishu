<template>
  <div class="ai-container">
    <div class="flex-container">
      <div
        class="card"
        v-for="item in aiTools"
        :key="item.name"
        @click="handleCardClick(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const aiTools = [
  { name: 'Deepseek', path: '/deepseek' },
  { name: '豆包', path: '/doubao' },
  { name: 'Kimi', path: '/kimi' },
  { name: '即时', path: '/instant' },
  { name: '可灵', path: '/keling' },
  { name: '天工', path: '/tiangong' },
  { name: 'Aippt', path: '/aippt' },
  { name: 'Processon', path: '/processon' },
  { name: '讯飞 ai', path: '/xunfei' },
];

const handleCardClick = (item) => {
  router.push(item.path);
};

const handleReturn = () => {
  router.back();
};
</script>

<style lang="less" scoped>
.ai-container {
  height: 100vh;
  background-color: rgba(0, 53, 127, 0.9);
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
  background-color: #1890ff;
  color: white;
  padding: 40px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    background-color: #40a9ff;
  }

  &:active {
    transform: translateY(0);
    background-color: #096dd9;
  }
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