<template>
    <div>
        <Navcomponent/>
        <div class="author-top">
            <div class="author-info">
                <div class="author-l">
                    <van-image round width="5rem" height="5rem" :src="picIP+author.image" />
                </div>
                <div class="author-r">
                    <van-button v-bind:icon="followicon" color="linear-gradient(to right, #ff6034, #ee0a24)" size="small" @click="focus">
                        {{ followLable}} 
                    </van-button>
                </div>
            </div> 
            <div class="author-name">{{author.userName}}</div>
            <van-tabs v-model:active="active">
                <van-tab title="全部"></van-tab>
                <van-tab title="文章"></van-tab>
                <van-tab title="视频"></van-tab>
                <van-tab title="问答"></van-tab>
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
            <div class="more" @click="getMore">{{ more }}</div>
        </div>
        <TabBar/>
    </div>
</template>
  
<script setup>
import Navcomponent from '../components/Navcomponent.vue';
import TabBar from '@/components/TabBar.vue'
import {ref,onMounted} from 'vue'
import { useStore } from 'vuex';
import { useRoute,useRouter } from 'vue-router';
import { createApp } from 'vue';
import { follow,disFollow,isFollow,getByUid} from '../api/apis';
import { Toast } from 'vant';
const app = createApp();
app.use(Toast);
const route=useRoute();
const router=useRouter();
const store=useStore();
const picIP=store.state.picIP
const user=store.state.user
const pageNo=ref(1)
const author=route.query
const list=ref([])
const pages=ref(1)
const more=ref("查看更多")
onMounted(()=>{
    getData();
    isFocus();
})
function getData(){
    getByUid(author.uid,pageNo.value).then((res)=>{
        list.value.push(...res.records); 
        pages.value=res.pages
    })
}
const getMore=()=>{
    pageNo.value++;
    if(pageNo.value>pages.value){
        more.value="没有更多了"
        return;
    }
    getData();
}
const followLable=ref("关注")
const followicon=ref("plus")

const isFocus=()=>{
    //判断是否关注
    if(user.uid==undefined){//未登录
        return;
    }
    isFollow(user.uid,author.uid).then(res=>{
        if(res==true){
            followLable.value="已关注"
            followicon.value=""
        }
    })
}

const focus=()=>{
    if(user.uid==undefined){//未登录
        Toast("您未登录,请先登录再关注作者")
        return;
    }
    if(followLable.value=="已关注"){
        //点击按钮,取消关注
        disFollow(user.uid,author.uid).then(res=>{
            followLable.value="关注"
            followicon.value="plus"
        })
    }else{
        //点击按钮,关注
        follow(user.uid,author.uid).then(res=>{
            followLable.value="已关注"
            followicon.value=""
        })
    }
}

const active = ref(0);
const goDetail=(item)=>{
router.push("/detail/"+item.aid)
}

</script>

<style scoped>
.column{
    margin-top: 190px;
}
.author-top{
    position:fixed;
    top:45px;
    left:0;
    width:100%;
    background-color:#fff;
}
.author-info{
    display: flex;
    justify-content: space-between;
    margin: 5px;
}
.author-r .van-button{
    margin-top:20px;
}
.author-name{
    text-align: left;
    font-size:24px;
    font-weight: bold;
    margin: 10px;
}
.more{
    height: 40px;
    line-height: 40px;
}
</style>