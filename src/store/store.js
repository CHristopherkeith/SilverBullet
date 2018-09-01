import Vue from 'vue'
import Vuex from 'vuex'
import * as types from "./type.js"
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		score: 0,
		hasWalletExt: false
	},
	mutations: {
		[types.ADD_SCORE](state,payload){
			state.score = state.score + 1;
		},
		[types.CLEAR_SCORE](state,payload){
			state.score = 0;
		},
		[types.CHECK_WALLET_EXT](state,payload){
			if(typeof(webExtensionWallet) === "undefined"){
				state.hasWalletExt = false;
			}else{
				state.hasWalletExt = true;
			}
		}
	},
	actions: {

	}
})

export default store