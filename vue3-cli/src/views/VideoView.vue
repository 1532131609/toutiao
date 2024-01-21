<template>
  <div class="video">
   <Search/>
   <div class="fixedTab">
      <van-tabs :active="active" @click-tab="onClickTab">
      <van-tab v-for="(item,index) in kinds"  :key="index" :title="item.content"></van-tab>
      </van-tabs>
    </div>
    
    <div class="column">
      <div class="video-card" v-for="(item,index) in list" :key="index" @click="goDetail(item)">
        <div class="video-top">
          <div class="title">{{item.title}}</div>
          <video :src="picIP+item.video" controls :poster="picIP+item.pictures"></video>
        </div>
        <div class="video-button">
          <div class="user">
            <van-image 
            round
            width="3rem"
            height="3rem"
            :src="picIP+item.image"></van-image>
            <div class="user-name">
              {{item.userName}}
            </div>
          </div>
          <div class="more">
            <van-icon name="chat-o" size="20"/>
            <van-icon name="ellipsis" size="20"/>
          </div>
        </div>
        
      
      </div>
    </div>

   <TabBar/>
  </div>
</template>
<script setup>
import Search from "@/components/Search.vue";
import TabBar from "@/components/TabBar.vue";
import {ref,reactive, onMounted} from 'vue'
import { getVideoList,getList,getKinds } from '../api/apis';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
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
  getVideoList((name+1)).then(res=>{
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
<style>
.video-top{
  position:relative;
}
.video-top .title{
  position: absolute;
  top:8%;
  left:5px;
  color:#777;
}
.more i{
  margin-right: 10px;
}
.video-button .user .user-name,.more{
  height: 3rem;
  line-height: 3rem;
  margin-left: 10px;
}
.video-top video{
  height: 260px;
  width:100%;
}
.video-button{
  display: flex;
  justify-content: space-between;
}
.video-button .user{
  display: flex;
}
</style>