<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">{{seller.description}}/{{seller.deliveryTime}}分钟到达</div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="supports_count" v-if="seller.supports" @click="showDetail(true)">
        <span class="count">{{seller.supports.length}}个</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail(true)">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <div class="background">
      <img :src="seller.avatar">
    </div>
    <div class="detail" v-show="detailShow" transition="fade">
      <div class="detail-wrapper">
        <div class="detail-main">
          <div class="name">{{seller.name}}</div>
          <div class="star-wrapper">
            <star :score="seller.score" :size="48"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="supports" v-if="seller.supports">
            <li class="support" v-for="support in seller.supports">
              <span class="icon" :class="classMap[support.type]"></span>
              <span class="text">{{support.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="content">
            <p>{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="showDetail(false)">
        <span class="icon-close"></span>
      </div>
    </div>
  </div>
</template>

<script>
  import star from '../star/star.vue'

  export default {
    props: ['seller'],
    data () {
      return {
        detailShow: false
      }
    },

    created () {
      this.classMap = ["decrease", "discount", "guarantee", "invoice", "special"]
    },

    methods: {
      showDetail (show) {
        this.detailShow = show
      }
    },

    components: {
      star
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .header
    position relative
    background rgba(7,17,27,0.5)
    color #fff
    overflow hidden
    .content-wrapper
      position relative
      padding 24px 12px 18px 24px
      .avatar
        display inline-block
        width 64px
        height 64px
        &>img
          width 100%
      .content
        display inline-block
        margin-left 16px
        .title
          margin-top 2px
          .brand
            display inline-block
            width 30px
            height: 18px
            background-repeat no-repeat
            background-size 30px 18px
            vertical-align middle
            bg-image(brand)

          .name
            margin-left 6px
            font-size 16px
            font-weight bold
            line-height 18px
        .description
          margin-top 8px
          margin-bottom 10px
          font-size 12px
          font-weight 200
          line-height 12px
        .support
          margin-bottom 2px
          .icon
            display inline-block
            width 12px
            height 12px
            background-size 12px 12px
            background-repeat no-repeat
            vertical-align middle
          .discount
            bg-image(discount_1)
          .decrease
            bg-image(decrease_1)
          .guarantee
            bg-image(guarantee_1)
          .invoice
            bg-image(invoice_1)
          .special
            bg-image(special_1)

          .text
            margin-left 4px
            font-size 10px
            font-weight 200
            line-height 12px



      .supports_count
        position absolute
        right 10px
        bottom 10px
        height 24px
        background: rgba(0,0,0,0.2);
        padding 7px 8px
        border-radius 8px
        box-sizing border-box
        .count
          margin-right 2px
          font-size 10px
          font-weight 200
          line-height 12px
          vertical-align top



    .bulletin-wrapper
      position relative
      background: rgba(7,17,27,0.2);
      padding 0 20px 0 12px
      text-overflow ellipsis
      overflow hidden
      white-space nowrap
      height 28px
      line-height 28px
      .bulletin-title
        display inline-block
        width 22px
        height 12px
        background-repeat no-repeat
        background-size 22px 12px
        bg-image(bulletin)
      .bulletin-text
        font-size 10px
        font-weight 200
        margin 0 4px
      .icon-keyboard_arrow_right
        position absolute
        top 8px
        right 0px


    .background
      position absolute
      top:0
      left:0
      width 100%
      height 100%
      z-index -1
      &>img
        width 100%
        height 100%
        filter blur(10px)


    .detail
      position fixed
      top:0
      left 0
      right 0
      bottom 0
      background: rgba(7,17,27,0.8);
      z-index 100
      &.fade-transition
        transition: opacity .5s ease
        opacity: 1
      &.fade-enter, &.fade-leave
        opacity: 0
      .detail-wrapper
        min-height 100%
        .detail-main
          padding-bottom 64px
          padding-top 64px
          .name
            text-align center
            font-size 16px
            font-weight 700
            line-height 16px
            margin-bottom 16px
          .star-wrapper
            height 24px
            line-height 24px
            text-align center

          .title
            padding 28px 36px 24px
            text-align center
            display flex
            .line
              flex 1
              width 112px
              height 2px
              background: rgba(255,255,255,0.2);
              margin-top 8px
            .text
              margin 0 12px

          .supports
            padding 0 48px
            .support
              height 16px
              margin-bottom 12px
              .icon
                display inline-block
                width 16px
                height: 16px
                background-size 16px 16px
                background-repeat no-repeat
                vertical-align middle
              .discount
                bg-image(discount_2)
              .decrease
                bg-image(decrease_2)
              .guarantee
                bg-image(guarantee_2)
              .invoice
                bg-image(invoice_2)
              .special
                bg-image(special_2)

              .text
                margin-left 6px
                font-size 12px
                font-weight 200
                line-height 12px



          .content
            padding 0 48px
            font-size 12px
            font-weight 200
            line-height 24px
      .detail-close
        margin-top -64px
        font-size 32px
        width 100%
        height 32px
        text-align center
        color #7e8c8d


</style>
