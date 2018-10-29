<template>
<div class="exactaimingRoot">
  <LoadingMask></LoadingMask>
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
      <transition-group name="list-complete"
        v-on:after-enter="afterEnter">
        <TheTarget v-for="(item,index) in items" :key="index" :left="item.left" :top="item.top" class="list-complete-item" @addScore="addScore" @add:clickMask="addClickMask"></TheTarget>
      </transition-group>
      <transition name="fade">
        <ClickMask v-if="ifClickMask" :clickMaskStyle="clickMaskStyleValue"></ClickMask>
      </transition>
  	</div>
    <div class="scorePanel">
      <RecordBoard :now="now"></RecordBoard>
    </div>
  </div>
</div>
</template>

<script>
import ClickMask from './ClickMask'
import LoadingMask from './LoadingMask'
import TheTarget from './TheTarget'
import ExactAimingMask from './ExactAimingMask'
import RecordBoard from './RecordBoard'
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'
export default {
  name: 'ExactAiming',
  components: {TheTarget, ExactAimingMask, RecordBoard, LoadingMask, ClickMask},
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
      durationValue: 60,
      ifClickMask: false,
      clickMaskStyleValue: {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      }
    }
  },
  methods: {
    afterEnter(el){
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
            // console.log(this.now.score, 'score')
            if(this.now.score > this.best.exactScore){
              this.confirmStatusValue = true;
            }
          }.bind(this), 550)
        }else{
          this.$store.commit('ADD_TOTAL_TARGET');
          this.items.push({
            value: tempItem,
            left: randomLeft*450,
            top: randomTop*450
          });
          this.time ++;
        }        
      }.bind(this),700)

    },
    addClickMask(clickMaskStyleValue){
      this.ifClickMask = true;
      this.clickMaskStyleValue = clickMaskStyleValue;
      setTimeout(()=>{
        this.ifClickMask = false;
      },1)
    }

  },
  computed: mapState([
    'now',
    'best',
    'hasWalletExt'
  ]),
  mounted: function(){
      this.axios.post('/meter_vis/foo', {
        a: 'a',
        b: 'b'
      })
      .then(function (res){
        console.log(res, 'res');
      })
      .catch(function (err) {
        console.log(err, '【err】');
      })

      this.$store.commit('CHECK_WALLET_EXT');
      if(!this.hasWalletExt){
        // this.maskTextValue = 'Please Install WebExtensionWallet First';
      }else{
        // return;
        this.$store.dispatch('GET_USER_ADDRESS').then(
          res => {
            // console.log(res, '【GET_USER_ADDRESS res】');
            this.$store.commit('SET_USER_ADDRESS', res);
            return this.$store.dispatch('GET_ACCOUNT_STATE');
          }
        ).then(
          res => {
            // console.log(res, '【GET_ACCOUNT_STATE res】');
            return this.$store.dispatch('GET_STORE', res)
          },
          err => {console.log(err, '【GET_ACCOUNT_STATE err】');}
        ).then(
          res => {
            // console.log(res, '【GET_STORE res】');
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
  .exactaimingRoot{
    width: 100%;
    height: 100%;
  }
  .time{
    color: #ffffff;
    position: absolute;
    top: 5px;
    right: 5px;
  }
	.exactaiming{
		position: absolute;
		margin: auto;
		padding: auto;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		width: 730px;
		height: 500px;
	}
  .exactaiming>div{
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
  .fade-leave-active {
    transition: opacity 1.0s;
  }
  .fade-leave-to{
    opacity: 0;
  }
</style>
