import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import goods from './modules/goods'
import ratings from './modules/ratings'
import seller from './modules/seller'

Vue.use(Vuex)

export default new Vuex.Store({
  actions,
  mutations,
  getters,
  modules:{
    goods,
    ratings,
    seller
  }
})