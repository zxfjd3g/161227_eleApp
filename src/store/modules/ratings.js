import axios from 'axios'
import {RECEIVE_RATINGS} from '../types'

const state = {
  ratings: []
}

const mutations = {
  [RECEIVE_RATINGS] (state, {ratings}) {
    state.ratings = ratings
  }
}

const actions = {
  getRatings ({commit}, callback) {
    axios.get('/api2/ratings')
      .then(response => {
        const result = response.data
        if(result.code===0) {
          commit(RECEIVE_RATINGS, {ratings: result.data})
          callback()
        }
      })
  }
}

const getters = {
  ratings (state) {
    return state.ratings
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}