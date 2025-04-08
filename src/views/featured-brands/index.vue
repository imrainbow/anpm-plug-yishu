<template>
  <div class="ai-help-container">
    <div class="ai-help-header">
      <div class="header-left">特色品牌</div>
      <div class="header-right" @click="handleReturn">
        <img src="@/assets/return.png" alt="返回" />
      </div>
    </div>
    <div class="ai-help-content">
      <div id="ai-assist" class="content-section">
        <div class="card">
          <div class="card-body">
            <div class="module-grid">
              <div class="module-card">
                <div class="module-card-header">
                  <i class="fas fa-robot"></i>
                  <h3>Deepseek</h3>
                </div>
                <div class="module-card-body">
                  <p class="module-card-description">
                    Deepseek AI提供智能文本生成和分析能力，辅助办案文书撰写。
                  </p>
                  <a
                    href="https://chat.deepseek.com/"
                    target="_blank"
                    class="module-card-link"
                    >访问Deepseek</a
                  >
                </div>
              </div>

              <div class="module-card">
                <div class="module-card-header">
                  <i class="fas fa-robot"></i>
                  <h3>Kimi</h3>
                </div>
                <div class="module-card-body">
                  <p class="module-card-description">
                    Kimi AI平台提供智能对话和文本生成功能，辅助法律分析和研究。
                  </p>
                  <a
                    href="https://kimi.moonshot.cn/"
                    target="_blank"
                    class="module-card-link"
                    >访问Kimi</a
                  >
                </div>
              </div>

              <div class="module-card">
                <div class="module-card-header">
                  <i class="fas fa-robot"></i>
                  <h3>豆包</h3>
                </div>
                <div class="module-card-body">
                  <p class="module-card-description">
                    字节跳动旗下豆包AI助手，提供丰富的交互式AI体验。
                  </p>
                  <a
                    href="https://www.doubao.com/"
                    target="_blank"
                    class="module-card-link"
                    >访问豆包</a
                  >
                </div>
              </div>
              <!-- 开始 -->
              <div class="module-card">
                <div class="module-card-header">
                  <i class="fas fa-robot"></i>
                  <h3>即梦</h3>
                </div>
                <div class="module-card-body">
                  <p class="module-card-description">图片生成最强</p>
                  <a
                    href="https://jimeng.jianying.com/"
                    target="_blank"
                    class="module-card-link"
                    >访问即梦</a
                  >
                </div>
              </div>
              <!-- /结束 -->
              <div class="module-card">
                <div class="module-card-header">
                  <i class="fas fa-robot"></i>
                  <h3>通义千问</h3>
                </div>
                <div class="module-card-body">
                  <p class="module-card-description">
                    阿里巴巴开发的大型语言模型，提供精准的智能对话和文本生成能力。
                  </p>
                  <a
                    href="https://qianwen.aliyun.com/"
                    target="_blank"
                    class="module-card-link"
                    >访问通义千问</a
                  >
                </div>
              </div>
              <div class="module-card">
                <div class="module-card-header">
                  <i class="fas fa-robot"></i>
                  <h3>天工</h3>
                </div>
                <div class="module-card-body">
                  <p class="module-card-description">AI音乐最强</p>
                  <a
                    href="https://tiangong.aliyun.com/"
                    target="_blank"
                    class="module-card-link"
                    >访问天工</a
                  >
                </div>
              </div>
              <div class="module-card">
                <div class="module-card-header">
                  <i class="fas fa-robot"></i>
                  <h3>AIPPT</h3>
                </div>
                <div class="module-card-body">
                  <p class="module-card-description">AI PPT最强</p>
                  <a
                    href="https://www.aippt.cn/"
                    target="_blank"
                    class="module-card-link"
                    >访问AIPPT</a
                  >
                </div>
              </div>
              <div class="module-card">
                <div class="module-card-header">
                  <i class="fas fa-robot"></i>
                  <h3>ProcessOn</h3>
                </div>
                <div class="module-card-body">
                  <p class="module-card-description">
                    ProcessOn是一款在线协作工具，提供流程图、思维导图、组织结构图等多种图表工具(流程图最强)。
                  </p>
                  <a
                    href="https://www.processon.com/"
                    target="_blank"
                    class="module-card-link"
                    >访问ProcessOn</a
                  >
                </div>
              </div>
              <div class="module-card">
                <div class="module-card-header">
                  <i class="fas fa-robot"></i>
                  <h3>纳米AI搜索</h3>
                </div>
                <div class="module-card-body">
                  <p class="module-card-description">
                    纳米AI搜索是一款AI搜索工具，提供精准的智能对话和文本生成能力（AI搜索最强）。
                  </p>
                  <a
                    href="https://www.nanmi.ai/"
                    target="_blank"
                    class="module-card-link"
                    >访问纳米AI搜索</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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