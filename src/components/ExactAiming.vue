<template>
  <div class="exactaiming">
  	<div>
  		<!-- <transition name="fade">
  			<TheTarget v-show="targetAppear"></TheTarget>
        <TheTarget v-show="targetAppear"></TheTarget>
  		</transition> -->
      <transition-group name="list-complete" tag="p">
        <!-- <TheTarget v-show="targetAppear"></TheTarget> -->
        <TheTarget v-for="(item,index) in items" :key="index" v-show="targetAppear" :style="{left: (index+1)*100+'px'}" class="list-complete-item"></TheTarget>
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
      items: [1,2,3],
    	targetAppear: false
    }
  },
  mounted: function(){
  	setTimeout(function(){
  		// console.log(this)
  		this.targetAppear = true;
  	}.bind(this), 1000)
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
    transition: all 1s;
    display: inline-block;
    margin-right: 10px;
  }
  .list-complete-enter, .list-complete-leave-to{
    opacity: 0;
    transform: translateY(30px);
  }
  .list-complete-leave-active {
    position: absolute;
  }
	
</style>
