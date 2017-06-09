<template>
  <!--
  <span class="star_48 star_48on"></span>
  <span class="star_48 star_48on"></span>
  <span class="star_48 star_48on"></span>
  <span class="star_48 star_48half"></span>
  <span class="star_48 star_48off"></span>
-->
  <span v-for="sc in starClasses" :class="sc" track-by="$index"></span>
</template>

<script>
  export default {
    props: {
      score: Number,
      size: Number
    },
    computed: {
      starClasses () {
        var scs = []
        var score = this.score
        //得到其整数值
        var scoreInterger = Math.floor(score)
        // 创建scoreInterger个全星的class
        for (var i = 0; i < scoreInterger; i++) {
          scs.push(`star_${this.size} star_${this.size}on`)
        }
        // 半星
        if(score-scoreInterger>=0.5) {
          scs.push(`star_${this.size} star_${this.size}half`)
        }
        // 灰星
        while(scs.length<5) {
          scs.push(`star_${this.size} star_${this.size}off`)
        }

        return scs
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
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
</style>
