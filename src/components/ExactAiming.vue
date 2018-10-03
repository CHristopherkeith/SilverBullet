<template>
  <div class="exactaiming">
  	<div class="mainPanel" @click="maskClick">
      <span class="time" v-show="!maskShowValue">{{time}} s</span>
      <ExactAimingMask
      :maskShow="maskShowValue"
      @update:maskShow="newValue=>maskShowValue=newValue"
      :confirmStatus="confirmStatusValue"
      @update:confirmStatus="newValue=>confirmStatusValue=newValue" 
      @trigger:exactAimingStart="exactAimingStart"
      :maskText="maskTextValue"
      :duration="durationValue"
      ></ExactAimingMask>
      <!-- <ExactAimingMask :maskShow.sync="maskShowValue"></ExactAimingMask> -->
      <transition-group name="list-complete"
        v-on:after-enter="afterEnter">
        <TheTarget v-for="(item,index) in items" :key="index" :left="item.left" :top="item.top" class="list-complete-item" @addScore="addScore"></TheTarget>
      </transition-group>
  	</div>
    <div class="scorePanel">
      <RecordBoard :now="now"></RecordBoard>
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
      items: [/*{
        value: 1,
        left: 250,
        top: 250
      }*/],
    	targetAppear: false,
      maskShowValue: true,
      confirmStatusValue: false,
      maskTextValue: 'CLICK TO START',
      time: 0,
      durationValue: 10,
    }
  },
  methods: {
    afterEnter(el){
      // this.items.splice(el.dataset.index, 1)
      if(el&&el.parentNode){
        el.parentNode.removeChild(el);
        this.$store.commit('ADD_MISSES_TARGET');
      }
    },
    ...mapMutations({
      addScore: 'ADD_HITS',
      maskClick: 'ADD_MISSES',
    }),
    exactAimingStart(){
      this.$store.commit('SET_PLAYING', {playingState: true});
      this.$store.commit('CLEAR_SCORE');
      var cnt = 0,
          timer,
          tempItem,
          randomLeft,
          randomTop;

      timer = setInterval(function(){
        randomLeft = Math.random();
        randomTop = Math.random();
        tempItem = cnt++;
        if(this.time >= this.durationValue){
          setTimeout(function(){
            this.$store.commit('SET_PLAYING', {playingState: false});
            clearTimeout(timer);
            this.maskShowValue = true;
            this.maskTextValue = 'PLAY AGAIN?CLICK!';
            this.time = 0;
            console.log(this.now.score, 'score')
            if(this.now.score > this.best.exactScore){
              this.confirmStatusValue = true;
            }
          }.bind(this), 350)
        }else{
          this.$store.commit('ADD_TOTAL_TARGET');
          this.items.push({
            value: tempItem,
            left: randomLeft*450,
            top: randomTop*450
          });
          this.time ++;
        }
        
        
      }.bind(this),800)

    }

  },
  computed: mapState([
    'now',
    'best',
    'hasWalletExt'
  ]),
  mounted: function(){
      this.$store.commit('CHECK_WALLET_EXT');
      console.log(this.hasWalletExt, 'hasWalletExt')
      if(!this.hasWalletExt){
        this.maskTextValue = 'Please Install WebExtensionWallet First';
      }else{
        // return;
        this.$store.dispatch('GET_USER_ADDRESS').then(
          res => {
            console.log(res, '【GET_USER_ADDRESS res】');
            this.$store.commit('SET_USER_ADDRESS', res);
            return this.$store.dispatch('GET_ACCOUNT_STATE');
          }
        ).then(
          res => {
            console.log(res, '【GET_ACCOUNT_STATE res】');
            return this.$store.dispatch('GET_STORE', res)
          },
          err => {console.log(err, '【GET_ACCOUNT_STATE err】');}
        ).then(
          res => {
            console.log(res, '【GET_STORE res】');
            if(res){
              this.$store.commit('SET_SCORE', res);
            }
          },
          err => {console.log(err, '【GET_STORE err】');},
        )
      }
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
    z-index: 2;
  }
  .list-complete-enter-active{
    animation: fade-in 1.1s linear;
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
