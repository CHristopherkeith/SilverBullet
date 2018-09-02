// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import { mapMutations } from 'vuex'
import NebPay from 'nebpay.js'
import Nebulas from 'nebulas'

const ContractAddress = 'nXXX'
const Neb = new Nebulas.Neb()
Neb.setRequest(new HttpRequest("https://testnet.nebulas.io"));
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#appMain',
  router,
  store,
  components: { App },
  template: '<App/>'
})
