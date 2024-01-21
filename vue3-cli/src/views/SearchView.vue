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
            @search="onSearch"
            >
            <template #action>
                <div @click="onClickButton">搜索</div>
            </template>
            </van-search>
        </div>
    </div>
    <div class="search-history">
        <div class="history-title">
            <div class="title-l">
                搜索历史
            </div>
            <div class="title-r">
                <van-icon name="delete-o" @click="clearHistory"/>
            </div>
        </div>
        <van-row>
            <van-col span="12" v-for="(item,index) in list" :key="index" @click="goSearchResult(item)">
                {{item}}
            </van-col>
        </van-row>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { Toast } from 'vant';
import { useStore } from 'vuex';
import { createApp } from 'vue';
import { Dialog } from 'vant';

// 全局注册
const app = createApp();
app.use(Dialog);

const router=useRouter()
function goBack(){
  router.back()
}
const value = ref('');
const store=useStore();
const onSearch = (val) => {
    if(val==''){
        Toast("请输入搜索内容");
        return;
    }
    //添加搜索记录
    store.commit('updateSearchHistory',val)
    //跳转到搜索结果界面显示搜索结果
    router.push("/searchResult/"+val)
};
const goSearchResult=(item)=>{
    onSearch(item);
}
const onClickButton = () => {
    onSearch(value.value);
};
const list=store.state.searchHistory;
const clearHistory=()=>{
    Dialog.confirm({
    title: '清空搜索历史记录',
    message:
        '您确认清空搜索历史记录吗?',
    })
    .then(() => {
        //确认
        store.commit('clearSearchHistory');
    })
    .catch(() => {
        //取消
    });

}
</script>

<style>
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
.search-history{
    margin-top:54px;
}
.history-title{
    display:flex;
    padding:10px;
    justify-content: space-between;
}
.title-r,.title-l{
    line-height: 28px;
}
.search-history .van-col{
    text-align: left;
    padding:5px 7px;
}
</style>