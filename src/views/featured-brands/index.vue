<template>
  <div class="ai-help-container">
    <div class="return-btn" @click="handleReturn">
      <img src="@/assets/return.png" alt="返回" />
    </div>
    <div v-if="secondMenu.length <= 1">
      <div class="ai-help-header">
        <div class="header-left">特色品牌</div>
      </div>
    </div>
    <div v-else>
      <el-tabs v-model="activeId" class="demo-tabs" @tab-click="handleTabClick">
        <el-tab-pane
          v-for="item in secondMenu"
          :key="item.id"
          :label="item.name"
          :name="item.id"
        >
          <PptCard v-if="filesList.length > 0" :files="filesList" />
          <div v-else>暂无数据</div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { getFilesByMenuID } from '@/api/ppt-page';
import { getPptMenuList } from '@/api/ppt-menu';
// 使用异步组件
const PptCard = defineAsyncComponent(() => 
  import('@/components/PptCard.vue')
)
const router = useRouter();
const queryData = ref({
  menu_id: 9,
  page: 1,
  page_size: 10
})
const pptMenuList = ref([]);
const getPptMenuListAsync = async () => {
  const res = await getPptMenuList();
  pptMenuList.value = res.data;
  handleSecondMenu();
}
const activeId = ref(9);
// 处理是不是有二级菜单
const secondMenu = ref([]);
const handleSecondMenu = () => {
  // debugger
  console.log(pptMenuList.value, 'pptMenuList');
  const menuObj = pptMenuList.value.find(item => item.id === queryData.value.menu_id);
  console.log(menuObj.children, 'menuObj');
  if (menuObj.children && menuObj.children.length > 0) {
    secondMenu.value = menuObj.children;
    activeId.value = secondMenu.value[0].id;
    queryData.value.menu_id = activeId.value;
    console.log(secondMenu.value, 'secondMenu');
  }
}
const filesList = ref([]);
const getFilesByMenuIDAsync = async () => {
  const res = await getFilesByMenuID(queryData.value);
  filesList.value = res.data.files;
  console.log(res, 'res');
}
const handleTabClick = async () => {
  queryData.value.menu_id = activeId.value;
  await getFilesByMenuIDAsync();
}

onMounted(async () => {
  await getPptMenuListAsync();
  await getFilesByMenuIDAsync();
})

const handleReturn = () => {
  router.back();
};
</script>

<style lang="less" scoped>
</style>