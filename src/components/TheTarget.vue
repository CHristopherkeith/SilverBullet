<template>
  <div class="thetarget" @click.stop="clickTarget" :style="{left: left+'px', top: top+'px'}">
  </div>
</template>

<script>
export default {
  name: 'TheTarget',
  props: ['left', 'top'],
  data () {
    return {
    }
  },
  methods: {
    clickTarget(e){
      this.$el.parentNode.removeChild(this.$el);
      this.$emit('addScore')
    }

  }
}
</script>

<style scoped>
</style>
