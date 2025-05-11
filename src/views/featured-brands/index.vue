<template>
  <div
    class="box-container"
    v-loading="getFilesLoading"
    element-loading-text="加载中..."
  >
    <PageTitle>{{ pageTitleText }}</PageTitle>
    <div class="page-bottom" style="padding: 3%" v-if="secondMenu.length <= 1">
      <PptCard v-if="filesList.length > 0" :files="filesList" />
      <div class="pagination-ppt-container" v-if="total > 6">
        <el-pagination
          v-model:current-page="queryData.page"
          v-model:page-size="queryData.pageSize"
          :page-sizes="[10, 20, 50, 100, 200]"
          :size="size"
          :disabled="disabled"
          :background="background"
          layout="prev, pager, next"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      <div class="no-data-container" v-if="filesList.length == 0">
        <NoData />
      </div>
    </div>
    <!-- 有2个以上二级标题 -->
    <div class="page-bottom-box" v-else>
      <div id="page-bottom" class="page-bottom" v-if="secondType == 1">
        <div
          @click="handleClick(item.id)"
          class="page-bottom-card"
          v-for="item in secondMenu"
          :key="item.id"
          :style="{ fontSize: `${33 * sizeRatio}px` }"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="page-bottom" style="padding: 3%" v-else>
        <PptCard v-if="filesList.length > 0" :files="filesList" />
        <div class="pagination-ppt-container" v-if="total > 6">
          <el-pagination
            v-model:current-page="queryData.page"
            v-model:page-size="queryData.pageSize"
            :page-sizes="[10, 20, 50, 100, 200]"
            :size="size"
            :disabled="disabled"
            :background="background"
            layout="prev, pager, next"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>

        <div class="no-data-container" v-if="filesList.length == 0">
          <NoData />
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

import PageTitle from '@/components/PageTitle.vue';
const secondType = ref(1)
const router = useRouter();
const route = useRoute()
const menuTitle = ref('')
const pageTitleText = ref('')
const getFilesLoading = ref(false)
onMounted(() => {
  getFilesLoading.value = true
  menuTitle.value = route.query.id

})
const sizeRatio = ref(1)
onMounted(() => {
  sizeRatio.value = window.innerWidth / 1920
})

const queryData = ref({
  menu_id: 9,
  page: 1,
  page_size: 6
})
const total = ref(0);
const pptMenuList = ref([]);
const getPptMenuListAsync = async () => {
  const res = await getPptMenuList();
  pptMenuList.value = res.data;
 queryData.value.menu_id = pptMenuList.value.find(item => item.name == menuTitle.value).id;
  handleSecondMenu();
  getFilesLoading.value = false
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
  
   pageTitleText.value = menuObj.name;
}
const filesList = ref([]);
const getFilesByMenuIDAsync = async () => {
  const res = await getFilesByMenuID(queryData.value);
  filesList.value = res.data.files;
  total.value = res.data.total;
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
const handleSizeChange = (size) => {
  queryData.value.page = 1;
  queryData.value.page_size = size;
  getFilesByMenuIDAsync();
}
const handleCurrentChange = (page) => {
  queryData.value.page = page;
  getFilesByMenuIDAsync();
}

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
  debugger
  pageTitleText.value = secondMenu.value.find(item => item.id == id).name;
  getFilesByMenuIDAsync();
}
</script>

<style lang="less" scoped>
</style>