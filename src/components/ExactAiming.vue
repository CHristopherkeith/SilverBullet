<template>
  <div class="exactaiming">
  	<div>
      <span class="time">{{time}} s</span>
      <ExactAimingMask :maskShow="maskShowValue" @update:maskShow="newValue=>maskShowValue=newValue" @trigger:exactAimingStart="exactAimingStart"></ExactAimingMask>
      <!-- <ExactAimingMask :maskShow.sync="maskShowValue"></ExactAimingMask> -->
      <transition-group name="list-complete"
        v-on:after-enter="afterEnter">
        <TheTarget v-for="(item,index) in items" :key="index" :left="item.left" :top="item.top" class="list-complete-item" :other="'index:'+index+';'+'item:'+JSON.stringify(item)" @addScore="addScore"></TheTarget>
      </transition-group>
  	</div>
  </div>
</template>

<script>
import TheTarget from './TheTarget'
import ExactAimingMask from './ExactAimingMask'
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'
export default {
  name: 'ExactAiming',
  components: {TheTarget, ExactAimingMask},
  data () {
    return {
      items: [],
    	targetAppear: false,
      maskShowValue: true,
      time: 0
    }
  },
  methods: {
    afterEnter(el){
      // this.items.splice(el.dataset.index, 1)
      if(el&&el.parentNode){
        el.parentNode.removeChild(el);
      }
    },
    // addScore(){
    //   this.$store.commit('ADD_SCORE');
    //   console.log(this.$store.state.score, '$score')
    //   console.log(this.score, 'score')
    // }
    ...mapMutations({
      addScore: 'ADD_SCORE'
    }),
    exactAimingStart(){
      // console.log('start...')
      var cnt = 0,
          timer,
          tempItem,
          randomLeft,
          randomTop,
          startTime = new Date();

      timer = setInterval(function(){
        randomLeft = Math.random();
        randomTop = Math.random();
        tempItem = cnt++;
        this.items.push({
          value: tempItem,
          left: randomLeft*450,
          top: randomTop*450
        });
        this.time = Math.floor((new Date() - startTime)/1000);
        console.log(this.time, 'this.time')
        if(this.time >= 20){
          clearTimeout(timer)
          console.log(this.score, 'score')
        }
      }.bind(this),1000)

    }

  },
  computed: mapState([
    'score',
  ]),
  mounted: function(){
    
    // var cnt = 0,
    //     timer,
    //     tempItem,
    //     randomLeft,
    //     randomTop;

    // timer = setInterval(function(){
    //   randomLeft = Math.random();
    //   randomTop = Math.random();
    //   tempItem = cnt++;
    //   this.items.push({
    //     value: tempItem,
    //     left: randomLeft*450,
    //     top: randomTop*450
    //   });
    //   if(cnt === 20){
    //     clearTimeout(timer)
    //     console.log(this.score, 'score')
    //   }
    // }.bind(this),1000)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .time{
    color: #ffffff;
    position: absolute;
    top: 5px;
    right: 5px;
  }
	.exactaiming>div, .exactAimingMask{
		position: absolute;
		margin: auto;
		padding: auto;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		width: 500px;
		height: 500px;
		background-color: #000000;
	}
  .exactAimingMask{
    /*background-color: #ffffff;*/
    /*opacity: 0.2;*/
    z-index: 1;
  }
  .list-complete-item {
    background-color: #4D72EE;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    position: absolute;
    cursor: crosshair;
  }
  .list-complete-enter-active{
    animation: fade-in 1.2s linear;
  }
  .list-complete-leave-active{
  }
  @keyframes fade-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
	
</style>
