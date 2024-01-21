<template><!--11.Toutiao头条列表页面-->
  <div>
    <div class="breadcrumb"><!--面包屑-->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">主页</el-breadcrumb-item>
        <el-breadcrumb-item
          ><a href="/toutiao">头条管理</a></el-breadcrumb-item
        >
        <el-breadcrumb-item>头条列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--搜索-->
    <el-form :inline="true"  class="demo-form-inline">
      <el-form-item label="头条标题">
        <el-input v-model="title" placeholder="请输入需要查询的头条标题" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getData">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="aid" label="编号" width="100" />
      <el-table-column prop="title" label="标题" width="500" />
      <el-table-column prop="time" label="时间" width="200"/>
      <el-table-column label="审核状态">
        <template #default="scope"><!--操作按钮-->
          <el-tag class="ml-2" type="danger" v-if="scope.row.kid==0">不通过</el-tag>
          <el-tag class="ml-2" type="success" v-else>通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope"><!--操作按钮-->
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >查看</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >审核</el-button
          >
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
    <el-dialog v-model="visible" title="审核头条" width="30%" center>
      <span>{{ toutiao }}</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="reject">不通过</el-button>
          <el-button type="primary" @click="visible = false">
            通过
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue'
import { getList,verify } from '@/api/apis';
import { InfoFilled } from '@element-plus/icons-vue'
const title=ref("")
const tableData = ref([])
onMounted(()=>{
  getData()
})
const getData=()=>{
  let formData=new FormData()//根据java项目添加相应参数
  formData.append("title",title.value);
  formData.append("pageNo",currentPage.value);
  formData.append("pageCount",pageSize.value);
  getList(formData).then(res=>{
    tableData.value=res.records;
    total.value=res.total;
  })
}
const currentPage = ref(1)
const pageSize = ref(10)  //默认10页
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const total=ref(101)  //总数据数
const visible=ref(false)
const toutiao=ref("")
const aid=ref(0)
const reject=()=>{
  verify(aid.value).then(res=>{
    if(res==1){
      getData()
    }
  })
  visible.value=false;
}
const handleEdit = (index, row) => {
  console.log(index, row)
}
const handleDelete = (indexr, row) => {
  visible.value=true;
  toutiao.value=row.title;
  aid.value=row.aid;
  console.log(index, row)
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
</style>