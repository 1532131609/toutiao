<template>
  <div>
    <Navcomponent/>
    <div class="regist">
      <h1>注册</h1>
      <van-form @submit="onSubmit" class="form1">
              <van-cell-group inset>
                <van-field
                  v-model="user.email"
                  name="email"
                  label="邮箱"
                  placeholder="邮箱"
                  :rules="[{ validator,required: true, message: '请填写邮箱' }]"
                />
                <van-field
                  v-model="user.checkcode"
                  center
                  clearable
                  name="checkcode"
                  label="邮箱验证码"
                  placeholder="请输入邮箱验证码"
                  :rules="[{ required: true, message: '请输入验证码'}]"
                >
                  <template #button>
                    <van-button size="small" type="primary" @click="send">发送验证码</van-button>
                  </template>
                </van-field>
                <van-field
                  v-model="user.username"
                  name="username"
                  label="用户名"
                  placeholder="用户名"
                  @blur="checkUsername1"
                  :rules="[{ required: true, message: '请填写用户名,必须以字母开头,只能包含字母、数字、下划线,长度为5-16之间',pattern }]"
                />
                <van-field
                  v-model="user.password"
                  type="password"
                  name="password"
                  label="密码"
                  placeholder="密码"
                  :rules="[{ required: true, message: '请填写密码,必须以字母开头,只能包含字母、数字、下划线,长度为5-16之间',pattern }]"
                />
                <van-field
                  v-model="user.password1"
                  type="password"
                  name="password1"
                  label="确认密码"
                  placeholder="确认密码"
                  :rules="[{ required: true, message: '请确认密码,必须与密码相同' }]"
                />
                
                <van-field name="uploader" label="头像">
                <template #input>
                <van-uploader v-model="fileList" />
                </template>
                </van-field>
              </van-cell-group>
              <div style="margin: 16px;">
                <van-button round block type="warning" native-type="submit">
                  提交
                </van-button>
              </div>
      </van-form>
    </div>
    <TabBar/>
  </div>
</template>
<script setup>
import {ref,reactive} from 'vue'
import TabBar from '@/components/TabBar.vue';
import Navcomponent from '@/components/Navcomponent.vue';
import {regist,checkUsername,sendMail} from "@/api/apis"
import { createApp } from 'vue';
import { Toast } from 'vant';
import {useRouter} from 'vue-router';
import { useStore } from 'vuex';
const app = createApp();
const router=useRouter();
app.use(Toast);
const store=useStore();
const picIP=store.state.picIP;
const user=reactive({
  username:"",
  password:"",
  email:"",
  password1:"",
  checkcode:""
})
const pattern=/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/;
const validator=(val)=>/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val);
const checkUsername1=()=>{
  if(!/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/.test(user.username)){
    Toast("请填写用户名,必须以字母开头,只能包含字母、数字、下划线,长度为5-16之间")
    return;
  }
    checkUsername(user.username).then(res=>{
      if(res=='exist'){
        user.username='';
        Toast("用户名重复,请使用其他用户名!");
        return;
      }
    })
}
const fileList = ref([]);
const onSubmit = (values) => {
  if(user.password!=user.password1){
    Toast("您的密码和确认密码不一致，请重新填写！")
    return ;
  }
  let form=document.querySelector(".form1");
  let formData=new FormData(form);
  // console.log(formData);
  let upload=fileList.value[0];
  if(upload==undefined){
    Toast("您未上传头像，请上传头像！")
    return ;
  }
  //console.log(fileList.value[0].file);
  // console.log(formData);
  formData.append("image1",fileList.value[0].file);
  regist(formData).then(res=>{
      if(res=="1"){
        Toast("注册成功!");
        router.push("/mine")
      }else{
        Toast("注册失败，请重新填写注册信息！");
      }
  })
};
const send=()=>{
  if(user.email==""){
    Toast("您输入的邮箱为空")
    return;
  }
  if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(user.email)){
    Toast("您输入的邮箱格式不正确")
    return;
  }
  sendMail(user.email).then(res=>{
    Toast("您的邮箱验证码发送成功,五分钟内有效,请及时操作!")
  })
}
</script>

<style>
.regist{
  margin-top: 50px;
}
</style>