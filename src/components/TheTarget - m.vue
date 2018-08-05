<template>
  <div class="theTargetCmp">
    <transition name="fade">
      <div class="thetarget" v-show="vshow">
      </div>
    </transition>
    <transition name="fade">
      <div class="thetarget" v-show="vshow">
      </div>
    </transition>
    <transition name="fade">
      <div class="thetarget" v-show="vshow">
      </div>
    </transition>
  </div>
  
</template>

<script>
export default {
  name: 'TheTarget',
  props: ['vshow'],
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .theTargetCmp{
    position: absolute;
    margin: auto;
    padding: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    /*border: solid 1px gray;*/
    width: 500px;
    height: 500px;
    background-color: #000000;
  }
	.thetarget{
    background-color: #4D72EE;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    position: absolute;
    cursor: crosshair;
    top: 100px;
    left: 100px;
  }
  .fade-enter-active{
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
  }
</style>
<style type="text/css">
  /*.thetarget{
    background-color: #4D72EE;
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }*/
</style>
