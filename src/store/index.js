import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    city: localStorage.getItem('city')?localStorage.getItem('city'):'深圳',
    cityID: localStorage.getItem('cityID')?localStorage.getItem('cityID'):30,
    cityNearList:[],
  },
  mutations: {
    setCity(state, value){
      state.city = value;
      
    },
    setCityID(state, value){
      state.cityID = value;
    }
  },
  actions: {
    selectCity(context, params){
      context.commit('setCity', params.city);
      context.commit('setCityID', params.id);
      // 持久化保存数据
      localStorage.setItem('city', params.city);
      localStorage.setItem('cityID', params.id);

      // 保存数据--访问过的城市
      var list = context.state.cityNearList;
      if(list.length == 0){
        list.push({id:params.id,nm:params.city});
      }else{
        list.map(item=>{
          if(item.id == params.id){
            // alert(1)
            return;
          }else{
            list.push({id:params.id,nm:params.city});
          }
        })
      }
      
      // list.push({'id':params.id,'nm':params.city});
      localStorage.setItem('list',JSON.stringify(list));
    }
  }
})
