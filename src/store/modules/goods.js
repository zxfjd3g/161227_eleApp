import axios from 'axios'
import Vue from 'vue'
import {RECEIVE_GOODS, CLEAR_CART, UPDATE_COUNT, SET_FOOD,
  SWITCH_ONLY_CONTENT, SET_SELECT_TYPE} from '../types'

const state = {
  goods: [],
  food: {},
  selectType: 2,
  onlyContent: true
}

const mutations = {
  [RECEIVE_GOODS] (state, {goods}) {
    state.goods = goods
  },
  [CLEAR_CART] (state, {foodList}) {
    foodList.forEach(food => {
      food.count = 0
    })
  },
  [UPDATE_COUNT] (state, {isAdd, food}) {
    if(isAdd) { // 加
      if(!food.count) { // 第一次
        // food.count = 1  // 新增的属性没有监视
        Vue.set(food, 'count', 1) // 有监视
      } else {
        food.count++
      }
    } else { // 减
      if(food.count) {
        food.count--
      }
    }
  },
  [SET_FOOD] (state, {food}) {
    state.food = food
  },
  [SWITCH_ONLY_CONTENT] (state) {
    state.onlyContent = !state.onlyContent
  },
  [SET_SELECT_TYPE] (state, {type}) {
    state.selectType = type
  }
 }

const actions = {
  getGoods ({commit}, callback) {
    axios.get('/api2/goods')
      .then(response => {
        const result = response.data
        if(result.code===0) {
          commit(RECEIVE_GOODS, {goods: result.data})
          callback()
        }
      })
  },
  updateFoodCount ({commit}, data) {
    commit(UPDATE_COUNT, data)
  },
  clearCart ({commit}, foodList) { // 让购物车中所有food的count指定为0
    commit(CLEAR_CART, {foodList})
  },
  setFood ({commit}, food) {
    commit(SET_FOOD, {food})
  },
  switchOnlyContent ({commit}) {
    commit(SWITCH_ONLY_CONTENT)
  },
  setSelectType ({commit}, type) {
    commit(SET_SELECT_TYPE, {type})
  }
}

const getters = {
  goods (state) {
    return state.goods
  },
  foodList (state) { // 找出所有count>0的food
    const foods = []
    state.goods.forEach(good => {
      good.foods.forEach(food => {
        if(food.count) {
          foods.push(food)
        }
      })
    })
    return foods
  },

  filterRatings (state) {
    // 如果还没有数据, 结束
    if(!state.food.ratings) {
      return []
    }

    const ratings = state.food.ratings
    const selectType = state.selectType
    const onlyContent = state.onlyContent
    return ratings.filter(rating => {
      var {rateType, text} = rating // 解构赋值
      if(selectType===2) {
        return !onlyContent || text.length>0
      } else {
        return selectType===rateType && (!onlyContent || text.length>0)
      }
    })
  },

  food (state) {
    return state.food
  },
  selectType (state) {
    return state.selectType
  },
  onlyContent (state) {
    return state.onlyContent
  },
  positiveLength (state) {
    const ratings = state.food.ratings || []
    /*
     var total = 0
     ratings.forEach(rating => {
     total += rating.rateType===0 ? 1 : 0
     })*/

    // 办法一: 过滤得到数组, 取出数组的length
    // return ratings.filter(rating => rating.rateType===0).length
    // 方法二: 使用reduce进行统计
    return ratings.reduce((preTotal, rating) => {
      return preTotal + (rating.rateType===0 ? 1 : 0)
    }, 0)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}