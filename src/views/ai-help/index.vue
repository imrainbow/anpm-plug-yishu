<template>
  <div class="ai-container">
    <!-- 返回按钮 -->
    <el-tooltip class="box-item" content="返回" placement="left">
      <img
        class="return-img"
        src="@/assets/return-circle.png"
        alt=""
        @click="handleReturn"
      />
    </el-tooltip>
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
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const aiTools = [
  { name: 'Deepseek', url: 'https://chat.deepseek.com/' },
  { name: '豆包', url: 'https://www.doubao.com/' },
  { name: 'Kimi', url: 'https://kimi.moonshot.cn/' },
  { name: '即时', url: 'https://instant.ai/' },
  { name: '可灵', url: 'https://www.keling.ai/' },
  { name: '天工', url: 'https://tiangong.aliyun.com/' },
  { name: 'Aippt', url: 'https://www.aippt.cn/' },
  { name: 'Processon', url: 'https://www.processon.com/' },
  { name: '讯飞 ai', url: 'https://xinghuo.xfyun.cn/' },
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
  background-color: rgb(0, 53, 127);
  color: #61d3ff;
  // padding: 40px;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  // box-shadow: inset 0px 0px 40px 0px rgba(108, 200, 255, 0.5);

  &:hover {
    transform: scale(1.1);
    transition: all 0.3s ease;
    color: #fff;
    // box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    // background-color: #40a9ff;
  }

  &:active {
    transform: translateY(0);
    // background-color: #096dd9;
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