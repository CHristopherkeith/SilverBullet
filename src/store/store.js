import Vue from 'vue'
import Vuex from 'vuex'
import * as types from "./type.js"
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		score: 0,
		hasWalletExt: false,
		userAddress: ''
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
		},
		[types.GET_USER_ADDRESS](state,payload){
			console.log("********* get account ************")
		    window.postMessage({
		        "target": "contentscript",
		        "data":{
		        },
		        "method": "getAccount",
		    }, "*");
		    let listenerFunc = function(e) {
			    if (!!e.data.data && !!e.data.data.account) {
			        state.userAddress = e.data.data.account;
			    }
			}
		    window.removeEventListener('message', listenerFunc);
		    window.addEventListener('message',listenerFunc);
		}
	},
	actions: {

	}
})

export default store