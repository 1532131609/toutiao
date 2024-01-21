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
        <div class="card" v-for="(item,index) in list" :key="index" @click="goDetail(item)">
            <div class="card-l">
                <div class="title">{{item.title}}</div>
                <div class="time">{{item.time}}</div>
            </div>
            <div class="card-r">
                <img :src="picIP+item.pictures"/>
            </div>
        </div>
        <div class="load" @click="getMore"> 
            <!-- 点击加载更多数据 -->
            {{finishedText}}
        </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter,useRoute } from 'vue-router';
import { ref,onMounted } from 'vue';
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
const finished = ref(false);
const finishedText=ref('加载更多')
const pageNo=ref(1);
onMounted(()=>{
    onLoad();//页面挂载完毕后即调用onLoad方法
})  
const onLoad = () => {
    //访问服务器获取数据,将数据存入FormData
    let formData=new FormData();
    formData.append("pageNo",pageNo.value)
    formData.append("title",value)
    search(formData).then(res=>{//返回数据apis.js中getByTitle
        list.value.push(...res.records);//解析数组中的元素并插入
        if (pageNo.value >=res.pages) {
            finished.value = true;//当页数达到最大时，完成上拉加载
            finishedText.value='没有更多了'
        }
        pageNo.value++;
    })
};

const getMore = () => {
    if(finished.value){//完全加载
        return;
    }
    onLoad();
};

const goDetail=(item)=>{
  router.push("/detail/"+item.aid)
}
</script>

<style>
.load{
    height: 40px;
    line-height: 40px;
}
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