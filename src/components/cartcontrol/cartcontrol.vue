<template>
  <div class="cartcontrol">
    <div class="cart-decrease icon-remove_circle_outline" v-show="food.count"
         @click.stop="updateFoodCount(food, false, $event)" transition="move">
      <!--<span class="inner icon-remove_circle_outline"></span>-->
    </div>
    <div class="cart-count" v-show="food.count">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop="updateFoodCount(food, true, $event)"></div>
  </div>
</template>

<script>
  export default {
    props: {
      food: Object,
      updateFoodCount: Function
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
      &.move-transition
        transition: all .4s linear
        opacity: 1
        transform: translate3d(0, 0, 0) rotate(0)
      &.move-enter, &.move-leave
        opacity: 0
        transform: translate3d(24px, 0, 0) rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
</style>
