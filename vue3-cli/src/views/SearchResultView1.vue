<template>
  <div>
    <div class="search-top">
        <div class="search-top-l">
            <van-icon name="arrow-left"  @click="goBack"/> 
        </div>
        <div class="search-top-r">
            <van-search
            v-model="value"
            show-action
            placeholder="请输入搜索关键词"
            shape="round"
            @click="onSearch"
            >
            <template #action>
                <div @click="onClickButton">搜索</div>
            </template>
            </van-search>
        </div>
    </div>
    <div class="search">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
            :loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
        <div class="card" v-for="(item,index) in list" :key="index" @click="goDetail(item)">
            <div class="card-l">
                <div class="title">{{item.title}}</div>
                <div class="time">{{item.time}}</div>
            </div>
            <div class="card-r">
                <img :src="picIP+item.pictures"/>
            </div>
        </div>
        </van-list>
        </van-pull-refresh>
    </div>
  </div>
</template>

<script setup>
import { useRouter,useRoute } from 'vue-router';
import { ref } from 'vue';
import { search } from '@/api/apis';
import { useStore } from 'vuex';

const router=useRouter()
function goBack(){
  router.back()
}
const route=useRoute();
const value = route.params.val;
const store=useStore()
const picIP=store.state.picIP
const onSearch = (val) => {
    //跳转到搜索结果界面显示搜索结果
    router.push("/search")
};
const onClickButton = () => {//点击搜索按钮跳转到/search页面
    router.push("/search")
}
    
const list=ref([]);
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);
const pageNo=ref(1);
const onLoad = () => {
        if (refreshing.value) {
          list.value = [];
          refreshing.value = false;
        }
        //访问服务器获取数据,将数据存入FormData
        let formData=new FormData();
        formData.append("pageNo",pageNo.value)
        formData.append("title",value)
        search(formData).then(res=>{//返回数据apis.js中getByTitle
            loading.value = false;
            //页数未达到最大，继续上拉pageNo.value++,可继续加载
            list.value.push(...res.list);//解析数组中的元素并插入
            if (pageNo.value >=res.totalPages) {
                 finished.value = true;//当页数达到最大时，完成上拉加载
            }
            pageNo.value++;
        })
        
        
};

const onRefresh = () => {
      // 清空列表数据
      list.value=[]
      finished.value = false;//未完全加载

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      loading.value = true;
      onLoad();
};

const goDetail=(item)=>{
  router.push("/detail/"+item.aid)
}
</script>

<style>
.search{
    margin-top: 54px;
}
.search-top{
    display: flex;
    height: 54px;
    line-height: 54px;
    font-size: 22px;
    padding: 0 10px;
    position: fixed;
    width: 100%;
    top:0;
    left:-10px;
    background-color: #fff;
    z-index: 100;
}
.search-top-r{
    flex:9;
    line-height:54px ;
}
.search-top-l{
    flex:1;
}
.van-search__action{
    color:#f00;
}
</style>