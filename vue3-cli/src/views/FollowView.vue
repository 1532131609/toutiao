<template>
  <div>
    <Navcomponent/>
    <div class="follow">
        <van-tabs v-model:active="active">
            <van-tab title="用户"></van-tab>
            <van-tab title="话题"></van-tab>
            <van-tab title="专题"></van-tab>
        </van-tabs>
        <van-search
            v-model="value"
            placeholder="搜索你关注的人"
            show-action
            shape="round"
            @cancel="goBack"
        />
        <div class="user-card" v-for="(item,index) in selectList" :key="index">
            <div class="user-image"><van-image round width="3.5rem" height="3.5rem" :src="picIP+item.image" /></div>
            <div class="user-info">
                <div>{{item.username}}</div>
                <div>{{item.email}}</div>
            </div>
            <div class="user-btn">
                <van-button round type="success" @click="goAuthor(item)">详情</van-button>
                <van-button round type="warning" @click="chat(item)">私聊</van-button>
            </div>
        </div>
    </div>
    <TabBar/>   
  </div>
</template>

<script setup>
import Navcomponent from '../components/Navcomponent.vue';
import TabBar from '@/components/TabBar.vue'
import {ref,onMounted,computed} from 'vue'
import { useStore } from 'vuex';
import { useRoute,useRouter } from 'vue-router';
import { createApp } from 'vue';
import { getFollowUsersByUserId} from '../api/apis';
import { Toast } from 'vant';
const app = createApp();
app.use(Toast);
const route=useRoute();
const router=useRouter();
const store=useStore();
const picIP=store.state.picIP
const user=store.state.user
const list=ref([])
const value=ref("")
const active = ref(0);
onMounted(()=>{
    getData();
})
const getData=()=>{
    //判断是否关注
    if(user.uid==undefined){//未登录
        return;
    }
    getFollowUsersByUserId(user.uid).then((res)=>{
        list.value=res; 
        console.log(list);
    })
}

// const selectList1=computed(()=>{
//     return list.value.filter(item=>{
//         return item.uname.indexOf(value.value)!=-1
//     })
// })

const goAuthor=(item)=>{
    router.push({
        name:'author',
        query:{
            uid:item.uid,
            image:item.image,
            username:item.username
        }
    })
}

const chat=(item)=>{
    router.push({
        name:'chat',
        query:{
            uid:item.uid,
            image:item.image,
            username:item.username
        }
    })
}

const selectList=computed(()=>{
    return list.value.filter(item=>{
        return item.username.indexOf(value.value)!=-1
    })
})
</script>

<style scoped>
.user-image{
    flex:1;
}
.user-info{
    flex:5;
}
.user-info .div{
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-all;
    margin-left:15px;
}
.user-btn{
    flex:4;
}
.follow{
    margin:45px 0;
}
.user-card{
    display: flex;
    justify-content:space-between;
    margin: 10px 0;
    border-bottom: 0.5px solid #ddd;
}
.user-info{
    line-height: 25px;
    text-align: left;
}
.user-btn .van-button{
    margin-top:5px;
    margin-left: 5px;
}
</style>