import { createRouter, createWebHistory } from 'vue-router'
import LayOut from '../views/LayOut.vue'  //2.导入LayOut
import store from '@/store'//25.未登录不能直接进入主页
const routes = [
  {
    path: '/',             //3.定义主路由为LayOut
    name: 'layOut',
    component: LayOut,
    redirect:"/index",   //6.跳转index 即HomeView页面
    children:[            //4.定义子路由为HomeView
      {
        path:'/index',
        name:'index',
        component:()=>import("@/views/HomeView.vue")
      },
      {
        path:'/toutiao',
        name:'toutiao',
        component:()=>import("@/views/Toutiao.vue")
      },
      {
        path:'/user',
        name:'user',
        component:()=>import("@/views/User.vue")
      }
    ]
  },
  {
    path: '/login',         //14.定义登录页面路由
    name: 'login',
    component: ()=> import( '../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//25.访问路由前进行判断
router.beforeEach((to,from,next)=>{
    const adminUser=store.state.adminUser//取出adminUser
    if(adminUser==""){      //未登录
      if(to.path=="/login"){        //访问登录界面,继续访问
        next()
        return
      }
      next("/login")      //访问其他界面,则强制跳转登录界面
    }else{            //已登录
      next()              //继续访问
    }

})
export default router
