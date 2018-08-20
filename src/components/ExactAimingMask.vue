<template>
  <div class="exactAimingMask" v-show="maskShow">
    <p class="instructions">
      Game duration: <span>{{duration}}</span> sec.
      <br>
      Hit: <span>+300</span> pts
      <br>
      Miss: <span>-100</span> pts
      <br>
      Left target: <span>-500</span> pts
    </p>
    <p class="clickText" @click="triggerStart">{{maskText}}</p>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'
export default {
  name: 'ExactAimingMask',
  // components: {TheTarget},
  props: ['maskShow', 'maskText', 'duration'],
  data () {
    return {
    }
  },
  methods: {
    triggerStart(){
      // this.maskShow = false;
      this.$emit('update:maskShow', false);
      this.$emit('trigger:exactAimingStart');
    }
  },
  // computed: mapState([
  //   'score',
  // ]),
  mounted: function(){

  }
}
</script>

<style scoped>
  .exactAimingMask{
    position: relative;
  }
  .exactAimingMask>p.clickText{
    cursor: pointer;
    color: #79B6E8;
    text-align: center;
    line-height: 500px;
    user-select: none;
    letter-spacing: 5px;
  }
  .exactAimingMask>p.instructions{
    position: absolute;
    /*background-color: white;*/
    width: 155px;
    height: 68px;
    top: 5px;
    left: 5px;
    font-size: 13px;
    line-height: 17px;
    color: #788290;
  }
  .exactAimingMask>p.instructions>span{
    color: white;
    /*font-weight: bolder;*/
  }
</style>
