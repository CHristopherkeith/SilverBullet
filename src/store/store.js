import Vue from 'vue'
import Vuex from 'vuex'
import * as types from "./type.js"
import NebPay from 'nebpay.js'
import Nebulas from 'nebulas'

const contractAddress = 'nXXX';
const neb = new Nebulas.Neb();
neb.setRequest(new Nebulas.HttpRequest("https://testnet.nebulas.io"));
neb.setRequest(new Nebulas.HttpRequest("https://mainnet.nebulas.io"));

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
			// console.log("********* get account ************")
			// console.log(this, 'this23333')
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
		getScore({commit, state}){
			return new Promise((resolve, reject) => {
				neb.api.getAccountState(/*state.userAddress*/'n1NgXVjAfGABv7BJnH6BC65jTkdPv4TVet1')
				.then(
					res => {
						console.log(res, '【res】')
					},
					err => {
						console.log(err, '【err】')
					}
				)
			})
		}
	}
})

export default store