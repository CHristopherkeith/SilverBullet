<template>
  <div class="thetarget" @click.stop="clickTarget" :style="{left: left+'px', top: top+'px'}" :class="{clickCls: isClick}">
  </div>
</template>

<script>
export default {
  name: 'TheTarget',
  props: ['left', 'top'],
  data () {
    return {
      isClick: false
    }
  },
  methods: {
    clickTarget(e){
      this.isClick = true;
      let scaleFactorMathcRes, scaleFactor, width, height;
      width = this.$el.offsetWidth;
      height = this.$el.offsetHeight;
      scaleFactorMathcRes = window.getComputedStyle(this.$el).getPropertyValue('transform').match(/matrix\((.+)\)/i);
      if(scaleFactorMathcRes){
        scaleFactor = scaleFactorMathcRes[1].split(',')[0];
        this.$emit('add:clickMask', {
          left: this.left+20*(1-scaleFactor),
          top: this.top+20*(1-scaleFactor),
          width:width*scaleFactor,
          height:height*scaleFactor
        });
      }
      this.$el.parentNode.removeChild(this.$el);
      this.$emit('addScore');
    }

  }
}
</script>

<style scoped>
  .clickCls{
    background-color: gray !important;
  }
  .thetarget{
    /*background: #00FF00 url(bgimage.gif) no-repeat fixed top;*/
    background: url(../assets/img/inu.jpg) no-repeat center center;
    background-size: 100% 100%;
  }
</style>
