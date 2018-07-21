import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import ExactAiming from '@/components/ExactAiming'
import PressReaction from '@/components/PressReaction'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'ExactAiming',
      component: ExactAiming
    },
    {
      path: '/exactaiming',
      // name: 'ExactAiming',
      component: ExactAiming
    },
    {
      path: '/pressreaction',
      // name: 'PressReaction',
      component: PressReaction
    }
  ]
})
