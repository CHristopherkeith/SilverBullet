<template>
  <div class="loadingMask" v-show="loadingMaskShow"></div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'LoadingMask',
  // props: ['loadingMaskShow'],
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
      'loadingMaskShow'
    ])
  },
  methods: {

  }
}
</script>

<style scoped>
  .loadingMask{
    width: 100%;
    height: 100%;
  }
  .loadingMask{
    background-color: white;
    background-image: url(../assets/img/timg.gif);
    background-repeat: no-repeat;
    background-position: center center;
    position: absolute;
    z-index: 1000;
    opacity: 0.7;
  }
</style>
