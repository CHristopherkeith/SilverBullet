<template>
  <div class="exactaiming">
  	<div>
  		<!-- <transition name="fade">
  			<TheTarget v-show="targetAppear"></TheTarget>
  		</transition> -->
      <transition-group name="list-complete" tag="p" 
        v-on:before-enter="beforeEnter" 
        v-on:enter="enter" 
        v-on:after-enter="afterEnter">
        <!-- <TheTarget v-for="(item,index) in items" :key="index" v-bind:style="{left: item.left+'px', top: item.top+'px'}" class="list-complete-item" :data-index="index" :other="'index:'+index+';'+'item:'+JSON.stringify(item)" @click></TheTarget> -->
        <TheTarget v-for="(item,index) in items" :key="index" :left="item.left" :top="item.top" class="list-complete-item" :other="'index:'+index+';'+'item:'+JSON.stringify(item)" @addScore="addScore"></TheTarget>
      </transition-group>
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
      // items: [1,2],
      items: [],
      score: 0,
    	targetAppear: false
    }
  },
  methods: {
    beforeEnter(){
      // console.log('beforeEnter')
      // console.log(new Date())
    },
    enter(){
      // console.log('enter')
      // console.log(new Date())
    },
    afterEnter(el){
      // console.log('afterEnter')
      // console.log(new Date())
      // console.log(el.dataset,'el')
      // console.log(el.dataset.index,'el')
      
      // console.log(el,'el')
      // debugger;
      // el.style.display = 'none';
      
      // this.items.splice(el.dataset.index, 1)
      // console.log(el.getAttribute('other'), 'other')
      // console.log(el,'el')
      // console.log(el.parentNode,'parentNodeparentNode')
      if(el&&el.parentNode){
        el.parentNode.removeChild(el);
      }
      
      // console.log(this.items, 'items')
    },
    addScore(){
      this.score++;
      console.log(this.score, 'this.score')
    }

  },
  mounted: function(){
    
    var cnt = 0,
        timer,
        tempItem,
        randomLeft,
        randomTop;
    // setTimeout(function(){
    //   this.items.splice(0,0,3);
    // }.bind(this), 1000)

   //  this.items.push(1);
  	// setTimeout(function(){
   //    this.items.push(2);
  	// }.bind(this), 1000)

   //  setTimeout(function(){
   //    this.items.push(3);
   //  }.bind(this), 2000)

    timer = setInterval(function(){
      randomLeft = Math.random();
      randomTop = Math.random();
      tempItem = cnt++;
      this.items.push({
        value: tempItem,
        left: randomLeft*450,
        top: randomTop*450
      });
      if(cnt === 20){
        clearTimeout(timer)
        console.log(this.score, 'score')
      }
    }.bind(this),1000)
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
    animation: fade-in 1.2s linear;
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
