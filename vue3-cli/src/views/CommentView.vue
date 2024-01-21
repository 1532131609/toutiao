<template>
  <div>
    <navcomponent/> 
   <van-tabs :active="active">
        <van-tab title="收藏"></van-tab>
        <van-tab title="评论"></van-tab>
        <van-tab title="点赞"></van-tab>
        <van-tab title="历史"></van-tab>
        <van-tab title="预约"></van-tab>
    </van-tabs>
    <div class="user">
        <div class="user-l">
            <div class="picture">
                <van-image
                round
                width="3.5rem"
                height="3.5rem"
                :src="picIP+image"
                />
            </div>
            <div class="name">
                {{username}}
            </div>
        </div>
        <div class="user-r">
        </div>
    </div>
    <div class="comments"  v-for="(item,index) in list" :key="index" @click="goDetail(item)">
      <van-swipe-cell>
        <div class="time">{{ item.time }}</div>
        <div class="content">{{ item.content }}</div>
        <div class="article">
            <div class="author">
                <div class="author-l">
                    <van-image
                    round
                    width="2.5rem"
                    height="2.5rem"
                    :src="picIP+item.image"
                    />
                    <div class="info">
                        <div class="author-name">
                            {{item.userName}}
                        </div>
                    </div>
                </div>
                <div class="author-r">
    
                </div>  
            </div>
            <div class="card">
                <div class="card-l">
                <div class="title">{{item.title}}</div>
                </div>
                <div class="card-r">
                <img :src="picIP+item.pictures"/>
                </div>
            </div>
        </div>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" @click="removeComment(item)"/>
        </template>
      </van-swipe-cell>  
    </div>
    <div class="load" @click="getMore"> 
            <!-- 点击加载更多数据 -->
            {{finishedText}}
    </div>
  </div>
</template>

<script setup>
import Navcomponent from '../components/Navcomponent.vue';
import { useStore } from 'vuex';
import {ref,onMounted} from 'vue';
import { getMyComments,removeComments} from '../api/apis';
import { useRouter } from 'vue-router';
import { createApp } from 'vue';
import { SwipeCell } from 'vant';
const store=useStore();
const username = ref('');
const image=ref('default.png')
const uid=ref(1);
const active = ref(1);
const picIP=store.state.picIP
const pageNo=ref(1);
const list=ref([]);
const router=useRouter();
const finished = ref(false);
const finishedText=ref('加载更多')
const app = createApp();
app.use(SwipeCell);
onMounted(()=>{//页面刷新不用重新登录
  let user=store.state.user//获取用户信息
  if(user.username!=undefined){//已登录过用户
    username.value=user.username;
    image.value=user.image;
    uid.value=user.uid;
  }
  onLoad();
})
const onLoad=()=>{
  getMyComments(uid.value,pageNo.value).then(res=>{
    list.value.push(...res.list);//解析数组中的元素并插入
    if (pageNo.value >=res.pages) {
        finished.value = true;//当页数达到最大时，完成上拉加载
        finishedText.value='没有更多了'
    }
    pageNo.value++;
  })
}
const getMore = () => {
    if(finished.value){//完全加载
        return;
    }
    onLoad();
};
const removeComment=(item)=>{
  removeComments(item.cid).then(res=>{
    pageNo.value=1;
    list.value=[];
    onLoad();
  })
}

const goDetail=(item)=>{
  router.push("/detail/"+item.aid)
}
</script>

<style scoped>

 .delete-button {
    height: 100%;
  }
.load{
    height: 40px;
    line-height: 40px;
}
.user,.user-l{
  display: flex;
}
.user{
  justify-content: space-between;
  margin-bottom:15px;
  border-bottom:1px solid #ddd;
  margin-top:100px;
}
.user-l .name,.user-r{
  line-height: 60px;

}
.user-l .name{
  font-size: 20px;
  margin-left: 5px;
  font-weight: 600;
}
.author{
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
}
.author-l{
    display: flex;
}
.comments{
    text-align: left;
}
.van-tabs{
  position: fixed;
  top:40px;
  left:0;
  width:100%;
  z-index: 10;
}
.comments .time,.comments .content{
  font-size: 14px;
  margin:3px;
}
.comments{
  text-align: left;
  margin:3px;
}
.article{
  border:1px solid #ddd;
}
.card{
  border-bottom:none;
}
</style>