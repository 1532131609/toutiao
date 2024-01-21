<template>
  <van-tabbar route v-model="active" active-color="#ee0a24" inactive-color="#000">
  <van-tabbar-item to="/" icon="wap-home">首页</van-tabbar-item>
  <van-tabbar-item to="/video" icon="video">视频</van-tabbar-item>
  <van-tabbar-item icon="live">放映厅</van-tabbar-item>
  <van-tabbar-item to="/mine" icon="manager">我的</van-tabbar-item>
</van-tabbar>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const active = ref(0);
    return { active };
  },
};

</script>

<style>

</style>