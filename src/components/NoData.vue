<template>
  <div class="no-data">
    <img src="@/assets/no-data.png" alt="暂无数据" />
    <div class="no-data-text">暂无数据</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  .no-data-text {
    color: #fff;
    margin-top: 10px;
    margin-left: -50px;
  }
}
</style>