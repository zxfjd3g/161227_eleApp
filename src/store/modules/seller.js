import axios from 'axios'
import {RECEIVE_SELLER} from '../types'

const state = {
  seller: {}
}

const mutations = {
  [RECEIVE_SELLER] (state, {seller}) {
    state.seller = seller
  }
}

const actions = {
  getSeller ({commit}) {
    axios.get('/api2/seller')
      .then(response => {
        const result = response.data
        if(result.code===0) {
          commit(RECEIVE_SELLER, {seller: result.data})
        }
      })
  }
}

const getters = {
  seller (state) {
    return state.seller
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}