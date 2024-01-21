<template><!--13.登录页面-->
  <div>
    <h1>头条系统后台管理员登录</h1>
    <el-form :model="form" label-width="120px">
        <el-form-item label="用户名">
            <el-input v-model="form.username" />
        </el-form-item>

        <el-form-item label="密码" >
            <el-input v-model="form.password" type="password"/>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>




<script setup>
//24.跳转
import { useRouter } from 'vue-router'; 

//22.引入
import { useStore } from 'vuex';

//18.消息提示
import { ElMessage } from 'element-plus'

//15.引入adminLogin方法
import { adminLogin } from '@/api/apis';

//13.账号密码数据绑定
import { reactive } from 'vue'
const form = reactive({
  username: '',
  password: ''
})
const onSubmit = () => {
  let formData=new FormData();//16.传输数据
  formData.append("username",form.username)
  formData.append("password",form.password)
  adminLogin(formData).then(//17.判断账号密码是否正确
    res=>{
        if(res==null || res==""){
            ElMessage({//18.消息提示
                message: '您输入的用户名或密码错误',
                grouping: true,
                type: 'error',
            })
        }else{
            ElMessage({
                message: '登录成功',
                grouping: true,
                type: 'success',
            })
            store.commit("login",form.username)//23.存储
            router.push("/")//24.跳转
        }
    }
  )
}
const store=useStore()
const router=useRouter()
</script>




<style>

</style>