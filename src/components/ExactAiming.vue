<template>
  <div class="exactaiming">
  	<div>
  		<transition name="fade">
  			<TheTarget v-show="targetAppear"></TheTarget>
  		</transition>
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
    	targetAppear: false
    }
  },
  mounted: function(){
  	setTimeout(function(){
  		console.log(this)
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
	
</style>
