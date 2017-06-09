<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img src="avatar.jpg">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">粥品香坊（回龙观）</span>
        </div>
        <div class="description">蜂鸟转送/38分钟到达</div>
        <div class="support">
          <span class="icon decrease_1"></span>
          <span class="text">在线支付满28减5</span>
        </div>
      </div>
      <div class="supports_count">
        <span class="count">5个</span>
        <span class="icon-keyboard_arrow_right"></span>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。</span>
      <span class="icon-keyboard_arrow_right"></span>
    </div>
    <div class="background">
      <img src="avatar.jpg">
    </div>
    <div class="detail" style="display: none">
      <div class="detail-wrapper">
        <div class="detail-main">
          <div class="name">粥品香坊（回龙观）</div>
          <div class="star-wrapper">
            <span class="star_48 star_48on"></span>
            <span class="star_48 star_48on"></span>
            <span class="star_48 star_48on"></span>
            <span class="star_48 star_48half"></span>
            <span class="star_48 star_48off"></span>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="supports">
            <li class="support">
              <span class="icon decrease_2"></span>
              <span class="text">在线支付满28减5</span>
            </li>
            <li class="support">
              <span class="icon discount_2"></span>
              <span class="text">VC无限橙果汁全场8折</span>
            </li>
            <li class="support">
              <span class="icon guarantee_2"></span>
              <span class="text">单人精彩套餐</span>
            </li>
            <li class="support">
              <span class="icon invoice_2"></span>
              <span class="text">该商家支持发票,请下单写好发票抬头</span>
            </li>
            <li class="support">
              <span class="icon special_2"></span>
              <span class="text">已加入“外卖保”计划,食品安全保障</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="content">
            <p>粥品香坊其烹饪粥料的秘方源于中国千年古法，在融和现代制作工艺，由世界烹饪大师屈浩先生领衔研发。坚守纯天然、0添加的良心品质深得消费者青睐，发展至今成为粥类的引领品牌。是2008年奥运会和2013年园博会指定餐饮服务商。</p>
          </div>
        </div>
      </div>
      <div class="detail-close">
        <span class="icon-close"></span>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
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
          .discount_1
            bg-image(discount_1)
          .decrease_1
            bg-image(decrease_1)
          .guarantee_1
            bg-image(guarantee_1)
          .invoice_1
            bg-image(invoice_1)
          .special_1
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
            .star_36
              display inline-block
              width 15px
              height: 15px
              background-repeat no-repeat
              background-size 15px 15px
              margin 0 10px
            .star_36on
              bg-star(star36_on)
            .star_36half
              bg-star(star36_half)
            .star_36off
              bg-star(star36_off)


            .star_24
              display inline-block
              width 10px
              height: 10px
              background-repeat no-repeat
              background-size 10px 10px
              margin 0 10px
            .star_24on
              bg-star(star24_on)
            .star_24half
              bg-star(star24_half)
            .star_24off
              bg-star(star24_off)


            .star_48
              display inline-block
              width 20px
              height: 19px
              background-repeat no-repeat
              background-size 20px 19px
              margin 0 10px
            .star_48on
              bg-star(star48_on)
            .star_48half
              bg-star(star48_half)
            .star_48off
              bg-star(star48_off)

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
              .discount_2
                bg-image(discount_2)
              .decrease_2
                bg-image(decrease_2)
              .guarantee_2
                bg-image(guarantee_2)
              .invoice_2
                bg-image(invoice_2)
              .special_2
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
