<template>
  <div class="detail" v-if="status">
    <div class="bottom">
    <Navcomponent/>
    <div class="title">
       {{toutiao.title}}
    </div>
    <div class="author">
    <div class="author-l" @click="goAuthor">   
        <van-image round width="2.5rem" height="2.5rem" :src="picIP+toutiao.image" />
        <div class="info">
            <div class="author-name">
            {{toutiao.userName}}
            </div>
           <div class="time">
           {{toutiao.time}}
           </div>
        </div>
    </div>
       
      <div class="author-r">
        <van-button v-bind:icon="followicon" color="linear-gradient(to right, #ff6034, #ee0a24)" size="small" @click="focus">
           {{ followLable}} 
       </van-button>
      </div>  
    </div>
    <div>
        <div class="pictures" v-if="toutiao.type==1"><!--判断是否为独立一整张图片-->
        <img :src="picIP+toutiao.pictures"/>
        </div>
        <div v-if="toutiao.type==3"><!--有视频时不显示图片-->
            <video :src="picIP+toutiao.video" controls autoplay/>
        </div>
        <div @click="download"><van-icon name="down"/>下载</div>
    </div>
    <div v-if="toutiao.type==2">
        <van-row gutter="5"><!--设置元素之间的间隙 -->
            <van-col span="8" v-for="(item,index) in toutiao.picList" :key="item.pid" @click="preview(index)"><!-- 每行24栅格,“span: 8”则每行三列 -->
                <van-image :src="picIP+item.pic"></van-image>
            </van-col>
        </van-row>
    </div>
    <div>
        {{toutiao.content}}
    </div>
    <h3>评论</h3>
    <div class="comment" v-for="(item,index) in comments" :key="index">
        <div class="comment-l">
           <van-image
           round
           width="2.5rem"
           height="2.5rem"
           :src="picIP+item.image"
           />
        </div>
        <div class="comment-r">
            <div class="name">{{item.userName}}</div>
            <div class="content">{{item.content}}</div>
            <div class="time">{{item.time}}</div>
        </div>
    </div>
  </div>
    <div class="input">
        <van-cell-group inset>
            <van-field
                v-model.trim="content"
                center
                clearable
                placeholder="请输入评论内容"
                @keyup.enter="addComment"
                >
                <template #button>
                    <van-button size="small" type="primary" @click="addComment">发送</van-button>
                </template>
            </van-field>
        </van-cell-group>
    </div>
  </div>
</template>

<script setup>
import { useRoute,useRouter } from 'vue-router';
import { useStore } from 'vuex';
import Navcomponent from '../components/Navcomponent.vue';
import { onMounted,ref ,reactive} from 'vue';
import { createApp } from 'vue'; 
import { getComments,getArticle ,addCom,downloadFile,follow,disFollow,isFollow} from '../api/apis';
import { Toast } from 'vant';
import { ImagePreview } from 'vant';

const preview=(index)=>{//点击图片显示原图
    let imgArr=new Array();//宿主
    toutiao.value.picList.forEach(item=>{//图片列表
        imgArr.push(picIP+item.pic)
    })
    ImagePreview({
        images: imgArr,
        startPosition: index,
        closeable: true
    });
}
const route=useRoute();
const aid=route.params.aid;
const store=useStore();
const toutiao=ref({})
const picIP=store.state.picIP
const comments=ref([])
const content=ref("")
const articleContent=ref("")
const status=ref(false)
const user=store.state.user//取出user信息
const app = createApp();
const router=useRouter();
app.use(Toast);
app.use(ImagePreview);

onMounted(()=>{
  getData()
})
function getData(){
    getArticle(aid).then(res=>{
        toutiao.value=res;
        status.value=true
        isFocus();
    })
    getComments(aid).then(res=>{
        comments.value=res
    })
}

const followLable=ref("关注")
const followicon=ref("plus")

const isFocus=()=>{
    //判断是否关注
    if(user.uid==undefined){//未登录
        return;
    }
    isFollow(user.uid,toutiao.value.uid).then(res=>{
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
        disFollow(user.uid,toutiao.value.uid).then(res=>{
            followLable.value="关注"
            followicon.value="plus"
        })
    }else{
        //点击按钮,关注
        follow(user.uid,toutiao.value.uid).then(res=>{
            followLable.value="已关注"
            followicon.value=""
        })
    }
}

const addComment=()=>{//发送评论
    let formData=new FormData()
    if(user.uid==undefined){//未登录
        Toast("您未登录,请先登录再评论")
        return;
    }
    if(content.value==''){
        Toast("您输入的内容为空")
        return;
    }
    formData.append("uid",user.uid)
    formData.append("aid",aid)
    formData.append("content",content.value)
    addCom(formData).then(res=>{
        getComments(aid).then(res=>{
        comments.value=res
       })
       content.value="";
    })
}
const download=()=>{
    let filename="";
    if(toutiao.value.type==1){
        filename=toutiao.value.pictures;
    }else{
        filename=toutiao.value.video;
    }
    downloadFile(filename).then((res)=>{
        //创建url
        let url=window.URL.createObjectURL(new Blob([res]))
        //创建a标签
        let link=document.createElement("a")
        //a标签不需要在页面上显示
        link.style.display='none';
        //a标签的href设置为url
        link.href=url
        link.setAttribute("download",filename)
        //将a标签放入页面
        document.body.appendChild(link)
        //模拟点击a标签行为
        link.click()
        //将url和link所占用的资源释放掉
        window.URL.revokeObjectURL(url)
        document.body.removeChild(link)
        Toast("下载成功");
    })
}

const goAuthor=()=>{
    router.push({
        name:'author',
        query:{
            uid:toutiao.value.uid,
            image:toutiao.value.image,
            userName:toutiao.value.userName
        }
    })
}
</script>

<style scoped>
video{
    width:100%;
}
.pictures img{
    width: 100%;
    height: 300px;
    margin-top: 11px;
}
.title{
    text-align: left;
    font-size: 24px;
    margin-bottom: 10px;
}
.author{
    display: flex;
    justify-content: space-between;
}
.author-l{
    display: flex;
}
.info{
    text-align: left;
    margin-left: 5px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.info .name{
    font-weight: 600;
    font-size: 14px;
}
.info .time,.comment-r .time{
    font-size: 10px;
    color: #999;
}
.comment{
    display: flex;
    margin: 5px 0;
}
h3,.comment-r{
   text-align: left;
}
.comment-r{
    margin-left: 5px;
}
.comment-r .name{
    font-weight: 600;
}
.comment-r .content{
    margin: 3px 0;
}
.input{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
}
.bottom{
    margin-bottom: 53px;
}
.detail{
    text-align: left;
}
</style>