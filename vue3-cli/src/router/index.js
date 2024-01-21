import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/video',
    name: 'video',
    
    component: ()=>import( '../views/VideoView.vue')
    },
    {
      path: '/detail/:aid',
      name: 'detail',    
      component: ()=>import( '../views/DetailView.vue')
      },
      {
        path: '/mine',
        name: 'mine',       
        component: ()=>import( '../views/MineView.vue')
        },
  {
    path: '/regist',
    name: 'regist',       
    component: ()=>import( '../views/RegistView.vue')
    },
  {
    path: '/toutiao',
    name: 'toutiao',       
    component: ()=>import( '../views/ToutiaoView.vue')
    },
  {
    path: '/search',
    name: 'search',       
    component: ()=>import( '../views/SearchView.vue')
    },
  {
    path: '/searchResult/:val',
    name: 'searchResult',       
    component: ()=>import( '../views/SearchResultView.vue')
    },
    {
      path: '/author',
      name: 'author',       
      component: ()=>import( '../views/AuthorView.vue')
      },
  {
    path: '/follow',
    name: 'follow',       
    component: ()=>import( '../views/FollowView.vue')
    },
  {
    path: '/funs',
    name: 'funs',       
    component: ()=>import( '../views/FunsView.vue')
    },
  {
    path: '/comment',
    name: 'comment',       
    component: ()=>import( '../views/CommentView.vue')
  },
  {
    path: '/chat',
    name: 'chat',       
    component: ()=>import( '../views/ChatView.vue')
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
