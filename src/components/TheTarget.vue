<template>
  <div class="thetarget" @click="clickTarget" :style="{left: left+'px', top: top+'px'}">
  </div>
</template>

<script>
export default {
  name: 'TheTarget',
  props: ['left', 'top'],
  data () {
    return {
    }
  },
  methods: {
    clickTarget(){
      // this.score++;
      // console.log(this.score, '33333333')
      console.log('44444444444444')
      console.log(this, 'this')
      this.$el.parentNode.removeChild(this.$el);
      this.$emit('addScore')
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.thetarget{
    /*background-color: #4D72EE;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    position: absolute;
    cursor: crosshair;*/
    /*background: url('../assets/inu2.jpg')  no-repeat center center;
    background-size:cover;*/
  }
 /* .fade-enter-active{
    animation: fade-in 1s linear;
  }
  .fade-leave-active {

  }
  @keyframes fade-in {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }*/
</style>
<style type="text/css">
  /*.thetarget{
    background-color: #4D72EE;
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }*/
</style>
