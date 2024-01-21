<template><!--11.Toutiao头条列表页面-->
    <div>
      <div class="breadcrumb"><!--面包屑-->
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/index' }">主页</el-breadcrumb-item>
          <el-breadcrumb-item
            ><a href="/toutiao">用户管理</a></el-breadcrumb-item
          >
          <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--搜索-->
      <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="用户名">
          <el-input v-model="title" placeholder="请输入需要查询的用户名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getData">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="downloadExcel">导出为Excel</el-button>
        </el-form-item>
      </el-form>
  
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="uid" label="编号" width="100" />
        <el-table-column prop="username" label="用户名" width="200" />
        <el-table-column prop="email" label="邮箱" width="280"/>
        <el-table-column label="Date" width="180">
            <template #default="scope">
                <div style="display:flex;align-items:center">
                    <el-image style="width:50px ;height:50px" :src="picIp+scope.row.image "/>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="审核状态">
          <template #default="scope"><!--操作按钮-->
            <el-tag class="ml-2" type="success" v-if="scope.row.type==1">普通用户</el-tag>
            <el-tag class="ml-2" type="warning" v-if="scope.row.type==2">管理员用户</el-tag>
            <el-tag class="ml-2" type="danger" v-if="scope.row.type==0">封禁用户</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope"><!--操作按钮-->
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
              >查看</el-button
            >
            <el-button v-if="scope.row.type==1"
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">封禁</el-button >
            <el-button v-if="scope.row.type==0"
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">解封</el-button >
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-block"><!--页码-->
        <el-pagination
          :currentPage="currentPage"
          :page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="sizes, prev, pager, next"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
      
    </div>
  </template>
  
  <script setup>
  import { ref,onMounted } from 'vue'
  import { getUserList,lockUser } from '@/api/apis';
  import { InfoFilled } from '@element-plus/icons-vue'
  import store from '@/store';
  import {utils,writeFileXLSX} from "xlsx";

  const picIp=store.state.picIp
  const currentPage = ref(1)
  const pageSize = ref(10)  //默认10页
  const small = ref(false)
  const background = ref(false)
  const disabled = ref(false)
  const total=ref(101)  //总数据数
  const visible=ref(false)
  const toutiao=ref("")
  const uid=ref(0)
  const title=ref("")
  const tableData = ref([])
  function exportExcel(json, name, titleArr, sheetName) {
      /* convert state to workbook */
      var data = new Array();
      var keyArray = new Array();
      const getLength = function (obj) {
        var count = 0;
        for (var i in obj) {
          if (obj.hasOwnProperty(i)) {
          count++;
          }
        }
      return count;
      };
      for (const key1 in json) {
      if (json.hasOwnProperty(key1)) {
        const element = json[key1];
        var rowDataArray = new Array();
        for (const key2 in element) {
        if (element.hasOwnProperty(key2)) {
          const element2 = element[key2];
          rowDataArray.push(element2);
          if (keyArray.length < getLength(element)) {
          keyArray.push(key2);
          }
        }
        }
        data.push(rowDataArray);
      }
      }
      // keyArray为英文字段表头
      data.splice(0, 0, keyArray, titleArr);
      console.log('data', data);
      const ws = utils.aoa_to_sheet(data);
      const wb = utils.book_new();
      // 此处隐藏英文字段表头
      var wsrows = [{ hidden: true }];
      ws['!rows'] = wsrows; // ws - worksheet
      utils.book_append_sheet(wb, ws, sheetName);
      /* generate file and send to client */
      writeFileXLSX(wb, name + '.xlsx');
    }
  const downloadExcel=()=>{
    const titleArr = ['编号','用户名','密码','头像','邮箱','类型','']//表头中文名
    exportExcel(tableData.value, 'test', titleArr, 'user');
  }
  
  onMounted(()=>{
    getData()
  })
  const getData=()=>{
    let formData=new FormData()//根据java项目添加相应参数
    formData.append("username",title.value);
    formData.append("pageNo",currentPage.value);
    formData.append("pageCount",pageSize.value);
    getUserList(formData).then(res=>{
      tableData.value=res.records;
      total.value=res.total;
    })
  }
 
    

  const handleEdit = (index, row) => {
    console.log(index, row)
  }
  const handleDelete = (index, row) => {
    let state=row.type==0?1:0;
    lockUser(row.uid,state).then(res=>{
        getData()
    })
  }
  
  
  const handleSizeChange = (val) => {
    //console.log(`${val} items per page`)
    pageSize.value=val;
    getData()
  }
  const handleCurrentChange = (val) => {
   // console.log(`current page: ${val}`)
    currentPage.value=val;
    getData()
  }
  </script>
  
  <style>
  .pagination-block{
    margin-top:10px;
  }
  .breadcrumb,.demo-form-inline{
    margin:20px 0;
  }
  .el-image img{
    border-radius: 25px;
  }
  </style>