<template>
  <div>
    <Navcomponent/>
    <div class="regist">
      <h1>发布头条</h1>
      <van-form @submit="onSubmit" class="form1">
              <van-cell-group inset>
                <van-field
                  v-model.trim="toutiao.title"
                  name="title"
                  label="标题"
                  placeholder="标题"
                  :rules="[{ required: true }]"
                />
                <van-field
                  v-model.trim="toutiao.content"
                  rows="5"
                  autosize
                  name="content"
                  label="内容"
                  type="textarea"
                  placeholder="内容"
                />
                <van-field
                  v-model="toutiao.kind"
                  is-link
                  readonly
                  name="kind"
                  label="分类"
                  placeholder="点击选择分类"
                  @click="showPicker = true"
                />
                <van-popup v-model:show="showPicker" position="bottom">
                  <van-picker
                    :columns="columns"
                    @confirm="onConfirm"
                    @cancel="showPicker = false"
                    :columns-field-names="customFieldName"
                  />
                </van-popup>
              
                <van-field name="uploader" label="图片">
                <template #input>
                <van-uploader v-model="fileList" />
                </template>
                </van-field>
              </van-cell-group>
              <div style="margin: 16px 40px 80px;">
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
import {ref,reactive,onMounted} from 'vue'
import TabBar from '@/components/TabBar.vue';
import Navcomponent from '@/components/Navcomponent.vue';
import {getKinds,addArticle} from "@/api/apis"
import { createApp } from 'vue';
import { Toast } from 'vant';
import {useRouter} from 'vue-router';
import { useStore } from 'vuex';
const app = createApp();
const router=useRouter();
app.use(Toast);
const store=useStore();
const picIP=store.state.picIP;

const user = store.state.user;

const showPicker = ref(false);

const toutiao=reactive({
  kind:"",
  title:"",
  content:"",
  kid:1
})

const columns = ref([]);

const customFieldName = {
      text: 'content',
      value: 'kid',
    };

onMounted(()=>{
  getKinds().then(res=>{
    columns.value=res;
  })
})

const onConfirm = (value, index) => { 
      toutiao.kid=value.kid;
      toutiao.kind=value.content;
      showPicker.value = false;
    };

const fileList = ref([]);

const onSubmit = (values) => {
  if(toutiao.title==''||toutiao.content==''){
    Toast("您未填写头条标题或内容，请填写完整！")
    return ;
  }
  if(user.uid==undefined){
    Toast("您未登录，请先登录再发布头条")
    return ;
  }
  let form=document.querySelector(".form1");
  let formData=new FormData(form);
  let upload=fileList.value[0];
  if(upload==undefined){
    Toast("您未上传图片，请上传图片！")
    return ;
  }
  formData.append("file",upload.file);
  formData.append("kid",toutiao.kid);
  formData.append("uid",user.uid);
  addArticle(formData).then(res=>{
      if(res=="1"){
        Toast("添加成功!");
        router.push("/mine")
      }else{
        Toast("添加失败，请重新填写头条信息！");
      }
  })
};

</script>

<style>
.regist{
  margin-top: 50px;
}
</style>