import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
export default createStore({
  plugins:[
    createPersistedState()
  ],
  state: {
    picIP:"http://127.0.0.1:8091/toutiao20231/pic/",
    searchHistory:[],
    user:{},
    stompUrl:'http://127.0.0.1:8091/toutiao20231/ws/ep'
  },
  getters: {
  },
  mutations: {
    updateSearchHistory:(state,val)=>{
      for(var i=0;i<state.searchHistory.length;i++){
          if(state.searchHistory[i]==val){
            state.searchHistory.splice(i,1);
            //如果先前有同样的搜索记录，则删除
          }
      }
      state.searchHistory.splice(0,0,val)
      //添加新的搜索记录
    },
    login:(state,u)=>{//持久化存储用户名密码,登录
      state.user=u;
    },
    logout:(state)=>{//退出登录
      state.user={}
    },
    clearSearchHistory:(state)=>{
      //清空搜索记录
      let length=state.searchHistory.length;
      state.searchHistory.splice(0,length);
    }
  },
  actions: {
  },
  modules: {
  }
})
