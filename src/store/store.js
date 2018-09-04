import Vue from 'vue'
import Vuex from 'vuex'
import * as types from "./type.js"
import NebPay from 'nebpay.js'
import Nebulas from 'nebulas'

const contractAddress = 'n21Rvxijhp9u8ubkWYotFPDnWLfGnpWgXSy';
const neb = new Nebulas.Neb();
const chainID = 1001;
neb.setRequest(new Nebulas.HttpRequest("https://testnet.nebulas.io"));
// neb.setRequest(new Nebulas.HttpRequest("https://mainnet.nebulas.io"));

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
		[types.SET_USER_ADDRESS](state,payload){
			state.userAddress = payload.userAddress;
		}
	},
	actions: {
		[types.GET_USER_ADDRESS]({commit, state, dispatch}){
			console.log("********* get account ************")
		    window.postMessage({
		        "target": "contentscript",
		        "data":{
		        },
		        "method": "getAccount",
		    }, "*");
		    let listenerFunc = function(e) {
			    if (!!e.data.data && !!e.data.data.account) {
			        // state.userAddress = e.data.data.account;
			        commit('SET_USER_ADDRESS', {
			        	userAddress: e.data.data.account
			        });
			        dispatch('GET_STORE').then(
			          res => {
			            console.log(res,'111111111111')
			            neb.api.call({
			            	chainID,
			            	from: state.userAddress,
			            	to: contractAddress,
			            	value: 0,
			            	nonce: parseInt(res.nonce) + 1,
			            	gasPrice: 1000000,
						   	gasLimit: 2000000,
						   	contract: {
						       function: "balanceOf",
						       args: "[0]"
						   }
			            }).then(
			            	res => {
			            		let result = JSON.parse(res.result || res);
			            		console.log(result, '【result】')

			            	}
			            )
			          },
			          err=>{
			            console.log(err,'2222222222')
			          }
			        );
			    }
			}
		    window.removeEventListener('message', listenerFunc);
		    window.addEventListener('message',listenerFunc);
		},
		[types.GET_STORE]({commit, state}){
			return new Promise((resolve, reject) => {
				neb.api.getAccountState(state.userAddress/*'n1NgXVjAfGABv7BJnH6BC65jTkdPv4TVet1'*/)
				.then(
					res => {
						resolve(res);
					},
					err => {
						reject(err);
					}
				)
			})
		}
	}
})

export default store