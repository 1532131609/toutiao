<template>
  <div>
    <Navcomponent/>
    <div class="chat-list">
        <div class="chat-card" v-for="(item,index) in list" :key="index">
            <div class="time">{{dataFliter(item.date)  }}</div>
            <div class="chat" :class="{self:item.fromuser==user.username}">
                <div class="user-image">
                    <van-image round width="3rem" height="3rem" 
                    :src="item.fromuser==user.username?picIP+user.image:picIP+author.image" />
                </div>
                <div class="chat-content">
                    <div class="user-name" v-if="item.fromuser==user.username">
                        {{ user.username }}
                    </div>
                    <div class="user-name" v-else>
                        {{ author.username }}
                    </div>
                    <div class="c-content">
                        {{ item.content }}
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="input">
        <van-cell-group inset>
            <van-field
                v-model.trim="content"
                center
                clearable
                placeholder="请输入..."
                @keyup.enter="addChat"
                >
                <template #button>
                    <van-button size="small" type="primary" @click="addChat">发送</van-button>
                </template>
            </van-field>
        </van-cell-group>
    </div>
  </div>
</template>

<script setup>
import Navcomponent from '../components/Navcomponent.vue';
import {ref,onMounted} from 'vue'
import { useStore } from 'vuex';
import { useRoute,useRouter } from 'vue-router';
import { createApp } from 'vue';
import { getChatList,chat} from '../api/apis';
import { Toast } from 'vant';
import dayjs from "dayjs"
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
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
const pages=ref(1)//总的页数
const more=ref("查看更多")
const content=ref("")
const stompClient=ref({})
const stompUrl=store.state.stompUrl
const addChat=()=>{
    let formData=new FormData()
    if(user.uid==undefined){//未登录
        Toast("您未登录,请先登录再聊天")
        return;
    }
    if(content.value==''){
        Toast("您输入的内容为空")
        return;
    }
    /*formData.append("fromuser",user.username)
    formData.append("touser",author.username )
    formData.append("content",content.value)
    chat(formData).then(res=>{
        list.value.push({
            fromuser:user.username,
            touser:author.username,
            content:content.value,
            date:new Date()
        })
        content.value="";
    })*/
    let msg={
        fromuser:user.username,
            touser:author.username,
            content:content.value,
            date:new Date()
    }
    stompClient.value.send("/chat",{},JSON.stringify(msg))
    list.value.push(msg)
    content.value=""; 
}
onMounted(()=>{
    getData();
    connectWS();
})
const connectWS=()=>{
    //与服务器连接
    let socket=new SockJS(stompUrl)
    stompClient.value=Stomp.over(socket)
    stompClient.value.connect({},success=>{
        //连接成功
        //订阅消息
        stompClient.value.subscribe("/user/"+user.username+'/queue/chat',res=>{
            //接收消息,将消息的内容添加到页面中
            let msg=JSON.parse(res.body);
            list.value.push(msg)
        })
    })
}
function getData(){
    if(user.uid==undefined){
        return;
    }
    getChatList(pageNo.value,author.username,user.username).then((res)=>{
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

const dataFliter=(val,format = "YYYY-MM-DD hh:mm:ss")=>{
      return dayjs(val).format(format);
    }
</script>

<style scoped>
.input{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    border-top:0.5px solid #ccc;
}
.time{
    color:#ccc;
    font-size:11px;
}
.self .user-name{
    text-align:right;
    margin:0 5px 0 0;
}
.user-name{
    text-align: left;
    margin:0 0 0 5px;
}
.chat-card{
    margin: 5px 3px;
}
.chat{
    display: flex;
}
.chat-list{
    margin: 50px 0;
}
.c-content{
    border:0.5px solid #ccc;
    padding:5px 10px;
    margin:5px;
    border-radius: 5px;
    background-color:#f9f9f9;
    font-size: 17px;
}
.self{
    flex-direction: row-reverse;
}
.self .c-content{
    background-color:#2E72EF;
    color:#fff;
}
</style>