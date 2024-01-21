<template>
  <div class="nav">
    <div class="nav-l">
       <van-icon name="arrow-left"  @click="goBack"/> 
    </div>
    <div class="nav-r">
       <van-icon name="home-o" />
       <van-icon name="search" />
       <van-icon name="ellipsis" />
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router=useRouter()
function goBack(){
  router.back()
}
</script>

<style>
.nav{
    display: flex;
    height: 45px;
    line-height: 45px;
    font-size: 22px;
    padding: 0 10px;
    position: fixed;
    width: 100%;
    top:0;
    left: 0;
    background-color: #fff;
    z-index: 10;
}
.nav-r{
  margin-left: 63%;
}
.nav-r .van-icon{
  margin-left: 10px;
}
</style>