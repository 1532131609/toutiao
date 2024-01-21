import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"//19.持久化存储
export default createStore({
  plugins:[
    createPersistedState()
  ],
  state: {
    adminUser:"",
    picIp:'http://localhost:8050/article/pic/'
  },
  getters: {
  },
  mutations: {
    login:(state,u)=>{
      state.adminUser=u;
    },
    exitLoin:(state)=>{
      state.adminUser="";
    }
  },
  actions: {
  },
  modules: {
  }
})
