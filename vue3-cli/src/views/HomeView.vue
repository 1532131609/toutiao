<template>
  <div class="home">
    <Search/>
<div class="fixedTab">
  <van-tabs :active="active" @click-tab="onClickTab">
  <van-tab v-for="(item,index) in kinds"  :key="index" :title="item.content"></van-tab>
  </van-tabs>
</div>

<div class="column">
  <div class="card" v-for="(item,index) in list" :key="index" @click="goDetail(item)">
    <div class="card-l">
      <div class="title">{{item.title}}</div>
      <div class="time">{{item.time}}</div>
    </div>
    <div class="card-r">
      <img :src="picIP+item.pictures"/>
    </div>
  </div>
</div>

    <TabBar/>
  </div>
</template>

<script setup>

import TabBar from '@/components/TabBar.vue'
import Search from '@/components/Search.vue';
import {ref,reactive, onMounted} from 'vue'
import { getList,getKinds } from '../api/apis';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
//import { getEnvironmentData } from 'worker_threads';
const active = ref(0);
const kinds=ref([])
const list=ref([])

const store=useStore()
const picIP=store.state.picIP

onMounted(()=>{
  getData()
})
const onClickTab = ({ name}) =>{
  //console.log(name);
  getList((name+1)).then(res=>{
    list.value=res;
  })
} ;
function getData(){
  onClickTab({name:0})
   getKinds().then(res=>{
    kinds.value=res
  })
}
const router=useRouter();
const goDetail=(item)=>{
  router.push("/detail/"+item.aid)
}
</script>
<style scoped>
</style>