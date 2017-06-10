<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left" @click="toggleList">

        <div class="logo-wrapper">
          <div class="logo" :class="{highlight: foodList.length}">
            <i class="icon-shopping_cart highlight"></i>
          </div>
          <div class="num" v-if="totalCount">{{totalCount}}</div>
        </div>

        <div class="price">￥{{totalPrice}}</div>

        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>

      <div class="content-right" @click="pay">
        <div class="pay" :class="payClass">
          {{payText}}
        </div>
      </div>
    </div>
    <div class="ball-container"></div>

    <div class="shopcart-list" transition="fold" v-show="listShow">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty" @click="clear">清空</span>
      </div>
      <div class="list-content" v-el:list-content>
        <ul>
          <li class="food" v-for="food in foodList">
            <span class="name">{{food.name}}</span>
            <div class="price">
              <span>￥{{food.price}}</span>
            </div>
            <div class="cartcontrol-wrapper">
              <cartcontrol :food="food" :update-food-count="updateFoodCount"></cartcontrol>
            </div>
          </li>
        </ul>
      </div>
    </div>

  </div>
  <div class="list-mask" v-show="listShow" transition="fade" @click="toggleList"></div>
</template>

<script>
  import BScroll from 'better-scroll'
  import cartcontrol from '../cartcontrol/cartcontrol.vue'

  export default {
    props: {
      foodList: Array,
      minPrice: Number,
      deliveryPrice: Number,
      updateFoodCount: Function
    },

    data () {
      return {
        isShow: false
      }
    },

    computed: {
      totalCount () {
        var count = 0
        this.foodList.forEach(food=> {
          count += food.count
        })
        return count
      },
      totalPrice () {
        var price = 0
        this.foodList.forEach(food=> {
          price += food.count*food.price
        })
        return price
      },
      payText () {
        if(this.totalCount===0) {
          return `￥${this.minPrice}元起送`
        } else if(this.totalPrice<this.minPrice) {
          return `还差￥${this.minPrice-this.totalPrice}元起送`
        } else {
          return '去结算'
        }
      },
      payClass () {
        return this.totalPrice<this.minPrice ? 'not-enough' : 'enough'
      },

      listShow () {

        if(this.foodList.length===0) {
          this.isShow = false
          return false
        }

        if(this.isShow) {
          this.$nextTick(() => {// 延迟到界面更新完成后调用
            if(!this.scroll) {
              this.scroll = new BScroll(this.$els.listContent, {
                click: true
              })
            } else {
              this.scroll.refresh() //刷新形成滚动
            }
          })
        }

        return this.isShow
      }
    },

    methods: {
      toggleList () {
        if(this.foodList.length) {
          this.isShow = !this.isShow
        }
      },
      clear () {
        if(confirm('确定清空购物车吗?')) {
          // 触发事件
          this.$emit('clear', this.foodList)
        }
      },

      pay () {
        if(this.totalPrice-this.minPrice>=0) {
          alert(`支付${this.totalPrice+this.deliveryPrice}`)
        }
      }
    },

    components: {
      cartcontrol
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        &.drop-transition
          transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
          .inner
            width: 16px
            height: 16px
            border-radius: 50%
            background: rgb(0, 160, 220)
            transition: all 0.4s linear
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      &.fold-transition
        transition: all 0.5s
        transform: translate3d(0, -100%, 0)
      &.fold-enter, &.fold-leave
        transform: translate3d(0, 0, 0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)

      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px

  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    &.fade-transition
      transition: all 0.5s
      opacity: 1
      background: rgba(7, 17, 27, 0.6)
    &.fade-enter, &.fade-leave
      opacity: 0
      background: rgba(7, 17, 27, 0)
</style>
