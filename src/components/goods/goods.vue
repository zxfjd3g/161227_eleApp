<template>
  <div class="goods">
    <div class="menu-wrapper" v-el:menu-wrapper>
      <ul>
        <!--current: 代表当前的-->
        <li class="menu-item" v-for="good in goods"
            :class="{current:currentIndex===$index}" @click="clickMenu($index, $event)">
          <span class="text border-1px">
            <span class="icon" v-if="good.type>=0" :class="classMap[good.type]"></span>{{good.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" v-el:foods-wrapper>
      <ul>
        <li class="food-list food-list-hook" v-for="good in goods">
          <h1 class="title">{{good.name}}</h1>
          <ul>
            <li class="food-item border-1px" v-for="food in good.foods" @click="showFood(food)">
              <div class="icon">
                <img width="57" height="57" :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">{{food.price | currency '￥'}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food" :update-food-count="updateFoodCount"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <shopcart :food-list="foodList" :min-price="seller.minPrice"
              :delivery-price="seller.deliveryPrice"
              :update-food-count="updateFoodCount"
              @clear="clearCart"
              v-ref:shopcart></shopcart>
  </div>

  <food :food="selectedFood" :update-food-count="updateFoodCount" v-ref:food></food>
</template>

<script>
  import Vue from 'vue'
  import cartcontrol from '../cartcontrol/cartcontrol.vue'
  import shopcart from '../shopcart/shopcart.vue'
  import food from '../food/food.vue'

  import BScroll from 'better-scroll'
  export default {
    props: ['seller'],
    data () {
      return {
        goods: [],
        scrollY: 0,
        tops: [],
        selectedFood: {}
      }
    },

    created () {
      this.classMap = ["decrease", "discount", "guarantee", "invoice", "special"]
      // 发ajax请求, 得到goods数据
      this.$http.get('/api2/goods')
        .then(response => {
          var result = response.body
          if(result.code===0) {
            this.goods = result.data

            // 将回调延迟到下次 DOM 更新循环之后执行
            this.$nextTick(() => {
              this._initScroll()
              this._initTops()
            })

            /*setTimeout(() => {
              this._initScroll()
            }, 200)*/
          }
        })
    },

    methods: {
      // 初始化创建Scroller对象, 形成滚动条
      _initScroll () {
        // 左侧菜单的scroll
        var menuScroll = new BScroll(this.$els.menuWrapper, {
          click: true //是否派发click事件
        })
        // 右侧goods列表的scroll
        this.foodsScroll = new BScroll(this.$els.foodsWrapper, {
          probeType: 3,  //让scroll事件回调函数执行
          click: true //是否派发click事件
        })

        // 监视foodsScroll的滚动
        this.foodsScroll.on('scroll', pos => {
          // console.log(pos.y)
          this.scrollY = -pos.y
        })
      },

      _initTops () { // 初始化tops
        var tops = this.tops
        var top = 0
        tops.push(top) // 添加第一个top值
        // 得到所有分类的li
        var lis = this.$els.foodsWrapper.getElementsByClassName('food-list-hook')
        ;[].slice.call(lis).forEach(li => {
          top += li.clientHeight
          tops.push(top)
        })
        console.log(tops)
      },

      clickMenu (index, event) {
        console.log(index, event)
        // 过滤系统的点击回调
        if(!event._constructed) {
          return
        }
        // 得到对应的li
        var lis = this.$els.foodsWrapper.getElementsByClassName('food-list-hook')
        var li = lis[index]
        // 滚动到li
        this.foodsScroll.scrollToElement(li, 300)
      },

      updateFoodCount (food, isAdd, event) {
        // 过滤系统的点击回调
        if(!event._constructed) {
          return
        }
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

        //启动一个小球动画(调用shopcart组件对象)
        this.$refs.shopcart.drop(event.target)
      },

      clearCart (foodList) { // 让购物车中所有food的count指定为0
        foodList.forEach(food => {
          food.count = 0
        })
      },

      showFood(food) {
        // 指定选中的food
        this.selectedFood = food
        // 显示food组件: 找到组件对象调用它的方法
        this.$refs.food.showOrHide(true)
      }
    },

    computed: {
      currentIndex () { // 计算当前分类的下标
        /*
        this.scrollY
        this.tops
         */
        return this.tops.findIndex((top, index) => {
          return this.scrollY>=top && this.scrollY<this.tops[index+1]  // 如果返回true, 结果就为对应的index
        })
      },

      foodList () { // 找出所有count>0的food
        const foods = []
        this.goods.forEach(good => {
          good.foods.forEach(food => {
            if(food.count) {
              foods.push(food)
            }
          })
        })
        return foods
      }
    },

    components: {
      cartcontrol,
      shopcart,
      food
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
