<template>
  <div class="exactaiming">
  	<div class="mainPanel">
      <span class="time" v-show="!maskShowValue">{{time}} s</span>
      <ExactAimingMask :maskShow="maskShowValue" @update:maskShow="newValue=>maskShowValue=newValue" @trigger:exactAimingStart="exactAimingStart" :maskText="maskTextValue" :duration="durationValue"></ExactAimingMask>
      <!-- <ExactAimingMask :maskShow.sync="maskShowValue"></ExactAimingMask> -->
      <transition-group name="list-complete"
        v-on:after-enter="afterEnter">
        <TheTarget v-for="(item,index) in items" :key="index" :left="item.left" :top="item.top" class="list-complete-item" @addScore="addScore"></TheTarget>
      </transition-group>
  	</div>
    <div class="scorePanel">
      <RecordBoard :score="score"></RecordBoard>
    </div>
  </div>
</template>

<script>
import TheTarget from './TheTarget'
import ExactAimingMask from './ExactAimingMask'
import RecordBoard from './RecordBoard'
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'
export default {
  name: 'ExactAiming',
  components: {TheTarget, ExactAimingMask, RecordBoard},
  data () {
    return {
      items: [],
    	targetAppear: false,
      maskShowValue: true,
      maskTextValue: 'CLICK TO START',
      time: 0,
      durationValue: 5
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
      this.$store.commit('CLEAR_SCORE');
      var cnt = 0,
          timer,
          tempItem,
          randomLeft,
          randomTop;
          // startTime = new Date();

      timer = setInterval(function(){
        randomLeft = Math.random();
        randomTop = Math.random();
        tempItem = cnt++;
        // console.log(this.time, 'this.time')
        if(this.time >= this.durationValue){
          setTimeout(function(){
            clearTimeout(timer);
            this.maskShowValue = true;
            this.maskTextValue = 'PLAY AGAIN?CLICK!';
            this.time = 0;
            console.log(this.score, 'score')
          }.bind(this), 200)
        }else{
          this.items.push({
            value: tempItem,
            left: randomLeft*450,
            top: randomTop*450
          });
          // this.time = Math.floor((new Date() - startTime)/1000);
          this.time ++;
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

<style scoped>
  .time{
    color: #ffffff;
    position: absolute;
    top: 5px;
    right: 5px;
  }
	.exactaiming/*, .exactAimingMask*/{
		position: absolute;
		margin: auto;
		padding: auto;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		width: 730px;
		height: 500px;
		/*background-color: #000000;*/
	}
  .exactaiming>div{
    /*display: inline-block;*/
    position: relative;
    float: left;
    height: 100%;
  }
  .exactAimingMask{
    z-index: 1;
    width: 100%;
    height: 100%;
  }
  .mainPanel{
    width: 500px;
    background-color: #000000;
    box-shadow: 0px 0px 5px 5px #000000;
  }
  .scorePanel{
    width: 230px;
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
