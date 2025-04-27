<template>
  <div class="dashboard-container">
    <!-- 设置 -->
    <div class="setting-panel">
      <el-dropdown trigger="click">
        <img
          class="setting-panel-img"
          src="@/assets/setting-panel.png"
          alt=""
        />

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleSystemManagement"
              ><el-icon><Setting /></el-icon>系统管理</el-dropdown-item
            >
            <el-dropdown-item divided @click="handleLogout"
              ><el-icon><SwitchButton /></el-icon>退出登录</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <!-- /设置 -->
    <!-- 顶部logo -->
    <img class="logo-panel" src="@/assets/images/logo.png" />
    <!-- /顶部logo -->
    <div class="dashboard-bg">
      <!--  顶部title -->
      <div class="title-panel"></div>
      <!-- /顶部title -->
      <!-- 左箭头 -->
      <img
        class="arrow-panel left-arrow-panel"
        src="@/assets/images/left-arrow-panel.png"
      />
      <!-- /左箭头 -->
      <!-- 右箭头 -->
      <img
        class="arrow-panel right-arrow-panel"
        src="@/assets/images/right-arrow-panel.png"
      />
      <!-- /右箭头 -->
      <!-- 左侧面板 -->
      <div class="left-panel">
        <div class="panel-itme left-panel-item" @click="handleAIHelp">
          <img
            class="panel-itme-img"
            src="@/assets/images/AI-help.png"
            alt="AI辅助"
          />
          <span class="panel-itme-text">AI辅助</span>
        </div>

        <div
          class="panel-itme left-panel-item"
          @click="gotoDetail('/legal-search')"
        >
          <img
            class="panel-itme-img"
            src="@/assets/images/legal-search.png"
            alt="法律检索"
          />
          <span class="panel-itme-text">法律检索</span>
        </div>
      </div>
      <!-- /左侧面板 -->
      <!-- 中间面板 -->
      <div class="middle-panel">
        <div
          class="panel-itme middle-panel-item"
          @click="gotoDetail('/check-cases')"
        >
          <img
            class="panel-itme-img"
            src="@/assets/images/check-cases.png"
            alt="检查办案"
          />
          <span class="panel-itme-text">检察办案</span>
        </div>
        <div
          class="panel-itme middle-panel-item"
          @click="gotoPptDetail('业务管理')"
        >
          <img
            class="panel-itme-img"
            src="@/assets/images/business-management.png"
            alt="业务管理"
          />
          <span class="panel-itme-text">业务管理</span>
        </div>
        <div
          class="panel-itme middle-panel-item"
          @click="gotoDetail('/business-management')"
        >
          <img
            class="panel-itme-img"
            src="@/assets/images/case-management.png"
            alt="案件管理"
          />
          <span class="panel-itme-text">案件管理</span>
        </div>
        <div
          class="panel-itme middle-panel-item"
          @click="gotoPptDetail('质量管理')"
        >
          <img
            class="panel-itme-img"
            src="@/assets/images/quality-assurance.png"
            alt="质量管理"
          />
          <span class="panel-itme-text">质量管理</span>
        </div>
      </div>
      <!-- /中间面板 -->
      <!-- 右侧面板 -->
      <div class="right-panel">
        <div
          class="panel-itme right-panel-item"
          @click="gotoPptDetail('特色品牌')"
        >
          <img
            class="panel-itme-img"
            src="@/assets/images/featured-brands.png"
            alt="特色品牌"
          />
          <span class="panel-itme-text">特色品牌</span>
        </div>
        <div
          class="panel-itme right-panel-item"
          @click="gotoPptDetail('数字模型')"
        >
          <img
            class="panel-itme-img"
            src="@/assets/images/digital-model.png"
            alt="数字模型"
          />
          <span class="panel-itme-text">数字模型</span>
        </div>
      </div>
      <!-- /右侧面板 -->
    </div>
  </div>
</template>

<script setup>
import { SwitchButton } from '@element-plus/icons-vue' 
import { useRouter } from "vue-router";
import { useStore } from 'vuex'
const router = useRouter();
const store = useStore()
const handleSystemManagement = () => {
  router.push("/system-management");
};
const handleLogout = () => {
  store.commit('user/DELETE_USER')
  router.push("/login");

};
const handleAIHelp = () => {
  router.push("/ai-help");
};
const gotoPptDetail = (id) => {
  router.push({
    path: '/ppt-page',
    query: { id }
  })
};
const gotoDetail = (path) => {
  router.push(path);
};
</script>

<style lang="less" scoped>
.dashboard-container {
  width: 100%;
  height: 100vh;
  background-image: url("@/assets/images/dashboard-bg.png");
  background-position: center; // 图片居中显示
  background-repeat: no-repeat; // 防止图片重复
  background-size: 100% 100%; // 图片铺满整个容器
  position: relative;
  .setting-panel {
    position: absolute;
    top: 20px;
    right: 30px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    .setting-panel-img {
      width: 100%;
      height: 100%;
    }
  }
  .logo-panel {
    width: 9.89583333%;
    height: 8.796296296%;
    position: absolute;
    top: 3.24074074%;
    left: 50%;
    transform: translateX(-50%);
  }
  .dashboard-bg {
    width: 100%;
    height: 78.507407%;
    background-image: url("@/assets/images/dashboard-bg2.png");
    background-position: center; // 图片居中显示
    background-repeat: no-repeat; // 防止图片重复
    background-size: 100% 100%; // 图片铺满整个容器
    position: absolute;
    top: 13.703704%;
    left: 0;
    .middle-panel {
      position: absolute;
      top: 22.64713874%;
      left: 50%;
      transform: translateX(-50%);
      width: 41.6666667%;
      height: 51.176487238%;
      background: url("@/assets/images/middle-panel.png") no-repeat center
        center;
      background-size: 100% 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 20px;
      .middle-panel-item {
        width: 21.052631578%;
        height: 100%;
        box-shadow: inset 0px 0px 40px 0px rgba(108, 200, 255, 0.5);
        background: rgba(73, 147, 251, 0.1);
        transition: all 0.3s ease; // 添加过渡效果
        cursor: pointer; // 添加手型光标

        &:hover {
          transform: scale(1.05); // 放大效果
          box-shadow: inset 0px 0px 60px 0px rgba(108, 200, 255, 0.7); // 加强阴影效果
        }
      }
    }
    .left-panel {
      position: absolute;
      left: 3.123475%;
      top: 17.92706515%;
      width: 19.7917%;
      height: 61.32943%;
      background: url("@/assets/images/left-panel.png") no-repeat center;
      background-size: 100% 100%;
      display: flex;
      padding: 20px;
      box-sizing: border-box;
      justify-content: space-between;
      align-items: center; // 底部对齐
      .left-panel-item {
        width: calc(50% - 10px);
        height: 100%;
        clip-path: polygon(0 0, 100% 3%, 100% 97%, 0 100%); // 创建梯形效果
        box-shadow: inset 0px 0px 40px 0px rgba(108, 200, 255, 0.5);
        background: rgba(73, 147, 251, 0.1);
        transition: all 0.3s ease; // 添加过渡效果
        cursor: pointer; // 添加手型光标

        &:hover {
          transform: scale(1.05); // 放大效果
          box-shadow: inset 0px 0px 60px 0px rgba(108, 200, 255, 0.7); // 加强阴影效果
        }
      }
      .left-panel-item:last-child {
        height: 93%;

        // clip-path: polygon(0 0, 100% 3%, 100% 97%, 0 100%); // 创建梯形效果
      }
    }
    .right-panel {
      position: absolute;
      right: 3.123475%;
      top: 17.92706515%;
      width: 19.7917%;
      height: 61.32943%;
      background: url("@/assets/images/right-panel.png") no-repeat center;
      background-size: 100% 100%;
      display: flex;
      padding: 20px;
      box-sizing: border-box;
      justify-content: space-between;
      align-items: center; // 底部对齐
      .right-panel-item {
        width: calc(50% - 10px);
        height: 100%;
        clip-path: polygon(0 3%, 100% 0, 100% 100%, 0 97%); // 创建梯形效果
        box-shadow: inset 0px 0px 40px 0px rgba(108, 200, 255, 0.5);
        background: rgba(73, 147, 251, 0.1);
        transition: all 0.3s ease; // 添加过渡效果
        cursor: pointer; // 添加手型光标

        &:hover {
          transform: scale(1.05); // 放大效果
          box-shadow: inset 0px 0px 60px 0px rgba(108, 200, 255, 0.7); // 加强阴影效果
        }
      }
      .right-panel-item:first-child {
        height: 93%;
        // clip-path: polygon(0 3%, 100% 0, 100% 100%, 0 97%); // 创建梯形效果
      }
    }

    .title-panel {
      position: absolute;
      left: 50%;
      top: 12.855582772%;
      transform: translateX(-50%);
      width: 36.25%;
      height: 8.255885266%;
      background: url("@/assets/images/title-panel.png") no-repeat center;
      background-size: 100% 100%;
    }
    .arrow-panel {
      width: 20.8333333%;
      height: 5.897060904%;
      position: absolute;
      top: 13.855582772%;
      z-index: 10;
    }
    .left-arrow-panel {
      left: 6.123475%;
    }
    .right-arrow-panel {
      right: 6.123475%;
    }
  }
}
.panel-itme {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #61d3ff;
  font-size: 26px;
  .panel-itme-text {
    margin-top: 30px;
  }
}
.panel-itme-img {
  width: 50%;
}
@media screen and (min-width: 1440px) and (max-width: 1919px) {
  .panel-itme-text {
    font-size: 24px;
  }
}

@media screen and (min-width: 1200px) and (max-width: 1439px) {
  .panel-itme-text {
    font-size: 22px;
  }
}

@media screen and (max-width: 1200px) {
  .panel-itme-text {
    font-size: 20px;
  }
}

@media screen and (max-width: 768px) {
  .panel-itme-text {
    font-size: 18px;
  }
}

@media screen and (max-width: 480px) {
  .panel-itme-text {
    font-size: 16px;
  }
}
</style>