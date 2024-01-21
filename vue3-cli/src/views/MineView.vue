<template>
  <div class="mine">
    <div class="minecolor">
   <TabBar/>
   <div class="top">
    <div class="top-l">
       <van-icon name="scan" />
    </div>
    <div class="top-r">
       <van-icon name="envelop-o" />
       <van-icon name="setting-o" />
    </div>
   </div>
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
      个人主页<van-icon name="arrow" />
    </div>
   </div>
   </div>
   <div class="gridcolor">
  <van-grid :border="false">
  <van-grid-item icon="fire-o" text="头条" />
  <van-grid-item icon="good-job-o" text="获赞" />
  <van-grid-item icon="flower-o" text="粉丝" to="/funs"/>
  <van-grid-item icon="like-o" text="关注" to="/follow"/>
  </van-grid>
  </div>
 <van-grid :border="false">
  <van-grid-item icon="comment-o" text="消息" icon-color="#ee0a24"/>
  <van-grid-item icon="bookmark-o" text="收藏" icon-color="#ee0a24"/>
  <van-grid-item icon="clock-o" text="历史" icon-color="#ee0a24"/>
  <van-grid-item icon="down" text="下载" icon-color="#ee0a24"/>
  </van-grid>
  <div class="post">
    <div class="text" style="text-align:center;margin:auto">再小的想法,都值得被记录</div>
    <div class="post-r">
      <router-link to="/toutiao">
       <van-button plain round icon="plus" type="warning" size="small">发布</van-button>
      </router-link>
    </div>
  </div>
  <h3>更多服务</h3>
  <div class="service">
   <van-grid :border="false">
  <van-grid-item icon="underway-o" text="反馈" />
  <van-grid-item icon="paid" text="钱包" />
  <van-grid-item icon="chat-o" text="广告" />
  <van-grid-item icon="volume-o" text="安全" />
  <van-grid-item icon="cluster-o" text="客服" />
  <van-grid-item icon="award-o" text="公益" />
  <van-grid-item icon="shop-o" text="免流量" />
  <van-grid-item icon="comment-o" text="评论" to="/comment"/>
  <van-grid-item icon="good-job-o" text="点赞" />
  <van-grid-item icon="cash-o" text="借钱" />
  <van-grid-item icon="closed-eye" text="夜间" />
  <van-grid-item icon="share-o" text="退出" @click="logout"/>
   </van-grid>
  </div>
      <van-overlay :show="show" >
      <div class="wrapper" @click.stop>
        <div class="block" >
          <h1>登录</h1>
          <van-form>
            <van-cell-group inset>
              <van-field
                v-model="username"
                name="用户名"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
              />
              <van-field
                v-model="password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
              />
            </van-cell-group>
            <div style="margin: 16px;" >
              <van-button round block type="primary" native-type="submit" @click="onSubmit">
                提交
              </van-button>
            </div>
          </van-form>
          <div class="reg-tip">
            <router-link to="/regist">没有账号？点击此处进行注册</router-link>
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script setup>
import TabBar from '@/components/TabBar.vue';
import { useStore } from 'vuex';
import {ref,onMounted} from 'vue';
import {login} from '@/api/apis'
import { createApp } from 'vue';
import { Toast } from 'vant';
import {useRouter} from 'vue-router';

const store=useStore();
const picIP=store.state.picIP;
const app = createApp();
const router=useRouter();
app.use(Toast);
const show = ref(true);
const username = ref('');
const password = ref('');
const image=ref('default.png')//头像默认值
onMounted(()=>{//页面刷新不用重新登录
  let user=store.state.user//获取用户信息
  if(user.username!=undefined){//已登录过用户
    username.value=user.username;
    image.value=user.image;
    show.value=false;//登录框隐藏
  }
})
const logout=()=>{//退出登录
  store.commit('logout');
  username.value="";
  image.value="default.png";
  show.value=true;
}
const onSubmit = (values) => {
  //console.log('submit', values);
  let formData=new FormData();
  formData.append("username",username.value);
  formData.append("password",password.value);//点击按钮提交用户名和密码
  login(formData).then(res=>{
      if(res==null||res==''){//判断用户名或密码是null(错误)或正确
        Toast("用户名或密码错误!")//页面提示
      }else{
        Toast("登录成功")
        show.value=false;//登录框隐藏
        image.value=res.image;//头像显示默认
        res.username=username.value;//将用户名记录
        store.commit('login',res)//uid，用户名，头像记录并传送
      }
  })
  };
</script>


<style>
.reg-tip{
  text-align: right;
  color:#f00;
  font-size:16px;
  margin-top: 10px;
}
.block h1{
  text-align: center;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 100%;
  height: 300px;
  background-color: #fff;
}
.minecolor,.gridcolor .van-grid-item__content{
  background-color: #eee;
}
.top{
    display: flex;
    height: 45px;
    line-height: 45px;
    justify-content: space-between;
}
.top .van-icon{
  font-size: 22px;
  margin: 0 5px;
}
.user,.user-l{
  display: flex;
}
.user{
  justify-content: space-between;
}
.user-l .name,.user-r{
  line-height: 60px;

}
.user-l .name{
  font-size: 20px;
  margin-left: 5px;
  font-weight: 600;
}
.post{
  display: flex;
  justify-content: space-between;
  height: 60px;
  margin: 5px 0;
  background-color: rgb(247, 240, 240);
  border-radius: 5px;
  line-height: 60px;
  width: 100%;
}
.post-r{
  line-height: 50px;
}
h3{
  text-align: left;
  font-size: 18px;
  font-weight: 500;
}
.service{
  margin-bottom: 50px;
}
</style>