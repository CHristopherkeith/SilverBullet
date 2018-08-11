<template>
  <div class="exactaiming">
  	<div>
  		<!-- <transition name="fade">
  			<TheTarget v-show="targetAppear"></TheTarget>
  		</transition> -->
      <!-- <transition-group name="list-complete" tag="p" 
      v-on:before-enter="beforeEnter" 
      v-on:enter="enter" 
      v-on:after-enter="afterEnter" 
      v-on:enter-cancelled="enterCancelled" 
      v-on:before-leave="beforeLeave" 
      v-on:leave="leave" 
      v-on:after-leave="afterLeave"
      v-on:leave-cancelled="leaveCancelled"> -->
      <transition-group name="list-complete" tag="p" 
      v-on:before-enter="beforeEnter" 
      v-on:enter="enter" 
      v-on:after-enter="afterEnter">
        <!-- <TheTarget v-for="(item,index) in items" :key="index" v-if="targetAppear" :style="{left: (index+1)*100+'px'}" class="list-complete-item"></TheTarget> -->
        <TheTarget v-for="(item,index) in items" :key="index" :style="{left: (index+1)*100+'px'}" class="list-complete-item" :data-index="index"></TheTarget>
      </transition-group>
      <!-- <transition name="fade">
        <TheTarget v-show="targetAppear"></TheTarget>
      </transition> -->
      <!-- <transition-group name="fade">
        <TheTarget v-show="targetAppear"></TheTarget>
        <TheTarget v-show="targetAppear"></TheTarget>
      </transition-group> -->
  	</div>
  </div>
</template>

<script>
import TheTarget from './TheTarget'
import PressReaction from './PressReaction'
export default {
  name: 'ExactAiming',
  components: {TheTarget},
  data () {
    return {
      items: [1,2],
    	targetAppear: false
    }
  },
  methods: {
    beforeEnter(){
      console.log('beforeEnter')
      console.log(new Date())
    },
    enter(){
      console.log('enter')
      console.log(new Date())
    },
    afterEnter(el){
      console.log('afterEnter')
      console.log(new Date())
      console.log(el.dataset.index,'el')
      console.log(el,'el')
      el.style.display = 'none';
      // el.parentNode.removeChild(el);
      this.items.splice(el.dataset.index, 1)
    }/*,
    enterCancelled(){
      console.log('enterCancelled')
    },
    beforeLeave(){
      console.log('beforeLeave')
    },
    leave(){
      console.log('leave')
    },
    afterLeave(){
      console.log('afterLeave')
    },
    leaveCancelled(){
      console.log('leaveCancelled')
    }*/

  },
  mounted: function(){
    this.items.push(3);
  	// setTimeout(function(){
  	// 	// this.targetAppear = true;
   //    this.items.push(3);
  	// }.bind(this), 1000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	/*.exactaiming{
		position: relative;
		width: 100%;
		height: 100%;
	}*/
	.exactaiming>div{
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
  .list-complete-item {
    /*transition: all 1s;
    display: inline-block;
    margin-right: 10px;*/
    
    /*display: none;*/

    background-color: #4D72EE;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    position: absolute;
    cursor: crosshair;

/*    animation: displayNone 1s linear;
    animation-fill-mode: forwards;*/

  }
  .list-complete-enter-active{
    animation: fade-in 1s linear;
    /*animation-fill-mode: forwards;*/
  }
  .list-complete-leave-active{
  }
  @keyframes fade-in {
    0% {
      transform: scale(0);
      /*display: block;*/
      /*width: 0px;*/
      /*background-color: #4D72EE;*/
    }
    50% {
      transform: scale(1);
      /*width: 40px;*/
      /*background-color: red;*/
    }
    100% {
      transform: scale(0);
      /*display: none;*/
      /*width: 20px;*/
      /*background-color: green;*/

    }
  }
/*   @keyframes displayNone {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }*/
	
</style>
