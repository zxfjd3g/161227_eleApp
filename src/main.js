import Vue from 'vue'
import VueResource from 'vue-resource'
import router from './router'
import app from './app'
import store from './store'

// 引入mockjs定义的模拟接口模块
import './mock/mockServer'
import './common/stylus/fonts.styl'

// 声明使用vue的扩展插件
Vue.use(VueResource)

new Vue({
  el: '#app',
  store,
  router,
  components: { app },
  template: '<app/>'
})
