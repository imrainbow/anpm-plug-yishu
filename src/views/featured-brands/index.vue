<template>
  <div class="ai-help-container help-container ppt-page">
    <el-tooltip class="box-item" content="返回" placement="left">
      <img
        class="return-img"
        src="@/assets/return-circle.png"
        alt=""
        @click="handleReturn"
      />
    </el-tooltip>
    <div class="box-container" v-if="secondMenu.length <= 1">
      <div class="ppt-card-container">
        <PptCard v-if="filesList.length > 0" :files="filesList" />
        <div class="no-data-container" v-else>
          <NoData />
        </div>
      </div>
    </div>
    <!-- 有2个以上二级标题 -->
    <div class="box-container" v-else>
      <div class="ai-help-content">
        <div id="ai-assist" class="content-section" v-if="secondType == 1">
          <div class="card-body" style="margin: unset">
            <div class="module-grid">
              <div
                @click="handleClick(item.id)"
                class="module-card"
                v-for="item in secondMenu"
                :key="item.id"
                style="
                  background: rgba(73, 147, 251, 0.1);
                  box-shadow: inset 0px 0px 40px 0px rgba(108, 200, 255, 0.5);
                "
              >
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="ppt-card-container" v-else>
          <PptCard v-if="filesList.length > 0" :files="filesList" />
          <div class="no-data-container" v-else>
            <NoData />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent, onMounted,onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import { getFilesByMenuID } from '@/api/ppt-page';
import { getPptMenuList } from '@/api/ppt-menu';

// 使用异步组件
const PptCard = defineAsyncComponent(() => 
  import('@/components/PptCard.vue')
)
const NoData = defineAsyncComponent(() => 
  import('@/components/NoData.vue')
)
const secondType = ref(1)
const router = useRouter();
const route = useRoute()
const menuTitle = ref('')
onMounted(() => {
  menuTitle.value = route.query.id

})

const queryData = ref({
  menu_id: 9,
  page: 1,
  page_size: 10
})
const pptMenuList = ref([]);
const getPptMenuListAsync = async () => {
  const res = await getPptMenuList();
  pptMenuList.value = res.data;
 queryData.value.menu_id = pptMenuList.value.find(item => item.name == menuTitle.value).id;
  handleSecondMenu();
}
const activeId = ref(9);

// 处理是不是有二级菜单
const secondMenu = ref([]);
const handleSecondMenu = () => {
  // debugger
  console.log(queryData.value.menu_id, 'queryData.value.menu_id');
  console.log(pptMenuList.value, 'pptMenuList');
  const menuObj = pptMenuList.value.find(item => item.id == queryData.value.menu_id);
  // console.log(menuObj.children, 'menuObj');

  if (menuObj.children && menuObj.children.length > 0) {
    secondMenu.value = menuObj.children;
    activeId.value = secondMenu.value[0].id;
    queryData.value.menu_id = activeId.value;
    console.log(secondMenu.value, 'secondMenu');
  }else {
    menuTitle.value = menuObj.name;
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
onBeforeMount(async () => {
  const id = route.query.id
  queryData.value.menu_id = id
  
})
onMounted(async () => {
  const id = route.query.id
  queryData.value.menu_id = id
  await getPptMenuListAsync();
  await getFilesByMenuIDAsync();
})

const handleReturn = () => {
  if(secondMenu.value.length > 1 && secondType.value == 2) {
    secondType.value = 1;
  }else {
    router.back();

  }
  
};
const handleClick = (id) => {
  secondType.value = 2;
  queryData.value.menu_id = id;
  getFilesByMenuIDAsync();
}
</script>

<style lang="less" scoped>
.ppt-page {
  padding: 20px;
  min-height: 100vh;
  background-color: rgba(0, 53, 127, 0.9);
}
.ai-help-container {
  height: unset !important;
}
.module-card {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #61d3ff;
  font-size: 20px;
  font-weight: bold;
  &:hover {
    cursor: pointer;

    color: #fff;
  }
}
.box-container {
  margin-top: 60px;
}
.card-body {
  background-color: unset;
  box-shadow: unset;
}
</style>