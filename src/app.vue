<template>
  <div>
    <ele-header :seller="seller"></ele-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import header from './components/header/header.vue'

  export default {

    data () {
      return {
        seller: {}
      }
    },

    created () {
      //发送ajax请求(mockjs提供的接口)
      this.$http.get('/api2/seller')
        .then(response => {
          console.log(response.body)
          const result = response.body
          if(result.code===0) {
            this.seller = result.data
            this.seller.score = 3.6
          }
        })
      //发送ajax请求(express提供的接口)
      /*this.$http.get('/api/seller')
        .then(response => {
          console.log(response.body)
        })*/
    },

    components: {
      'ele-header': header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/mixins.styl"

  .tab
    height 40px
    line-height 40px
    display flex
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      flex-grow 1
      text-align center
      font-size 14px
      color rgb(77,85,93)
      a
        display block
        &.active
          color:rgb(240,20,20)
</style>
