<template><!--1.创建LayOut界面-->
    <div class="common-layout">
      <el-container>
        <el-header class="flex-between">        <!--头部--><!--8.flex竖直居中对齐  flex-between水平左右对齐-->
            <div class="flex">
                <img src="@/assets/logo.png"/>
                <h1>头条后台管理系统</h1>
            </div>
            <div class="btn">
                <el-button type="danger" @click="quit">退出登录</el-button>
            </div>
        </el-header>           
        <el-container>

            <el-aside width="200px">        <!--左侧-->
               <!--7.左侧样式-->
                <el-menu                            
                    active-text-color="#ffd04b"
                    background-color="#545c64"
                    class="el-menu-vertical-demo"
                    default-active="2"
                    text-color="#fff"
                    @open="handleOpen"
                    @close="handleClose"
                    :router=true            
                >
                <!--9.分类列表-->
                    <el-sub-menu index="1">
                        <template #title>
                            <el-icon><location /></el-icon>
                            <span>头条管理</span>
                        </template>

                        <el-menu-item-group>
                            <el-menu-item index="/toutiao">头条列表</el-menu-item><!--12.将index改为/toutiao-->
                        </el-menu-item-group>

                    </el-sub-menu>

                    <el-sub-menu index="2">
                        <template #title>
                            <el-icon><Setting /></el-icon>
                            <span>分类管理</span>
                        </template>

                        <el-menu-item-group>
                            <el-menu-item index="2-1">分类列表</el-menu-item>
                        </el-menu-item-group>

                    </el-sub-menu>

                    <el-sub-menu index="3">
                        <template #title>
                            <el-icon><User /></el-icon>
                            <span>用户管理</span>
                        </template>

                        <el-menu-item-group>
                            <el-menu-item index="/user">用户列表</el-menu-item>
                        </el-menu-item-group>

                    </el-sub-menu>

                </el-menu>

            </el-aside>        
            <el-main>                   <!--右侧-->
                <router-view/>        <!--5.跳转子路由-->
            </el-main>
        </el-container>
      </el-container>
    </div>
  </template>
  
<script setup>
import store from '@/store'
import router from '@/router'
const handleOpen = (key, keyPath) => {
console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
const quit=()=>{
    store.commit('exitLoin')
    router.push('/login')
}
</script>

<style>
.el-menu{
    border-right: none;
}
.el-aside{
    height: 100vh;  
}
.el-container{
    height: 100vh;  
    overflow: hidden;
}
.el-header{
    background-color: #545c64;
    color:#fff;
}
.el-header,.el-aside{
    background-color: #545c64;
    color: #fff;
}
</style>