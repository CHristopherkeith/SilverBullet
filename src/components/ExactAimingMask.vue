<template>
  <div class="exactAimingMask" v-show="maskShow">
    <p @click="triggerStart">点击开始</p>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'
export default {
  name: 'ExactAimingMask',
  // components: {TheTarget},
  props: ['maskShow'],
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
  .exactAimingMask>p{
    cursor: pointer;
    color: #79B6E8;
    text-align: center;
    line-height: 500px;
    user-select: none;
    letter-spacing: 5px;
  }
</style>
