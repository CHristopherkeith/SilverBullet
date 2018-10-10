<template>
  <div class="thetarget" @click.stop="clickTarget" :style="{left: left+'px', top: top+'px'}" :class="{clickCls: isClick}">
  </div>
</template>

<script>
export default {
  name: 'TheTarget',
  props: ['left', 'top'],
  data () {
    return {
      isClick: false
    }
  },
  methods: {
    clickTarget(e){
      this.isClick = true;
      this.$el.parentNode.removeChild(this.$el);
      this.$emit('addScore')
    }

  }
}
</script>

<style scoped>
  .clickCls{
    background-color: gray !important;
  }
</style>
