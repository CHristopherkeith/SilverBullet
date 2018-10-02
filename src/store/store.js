import Vue from 'vue'
import Vuex from 'vuex'
import * as types from "./type.js"
import NebPay from 'nebpay.js'
import Nebulas from 'nebulas'

NebPay.config = {
	testnetUrl: "https://testnet.nebulas.io",
	mainnetUrl: "https://mainnet.nebulas.io"
}
// const contractAddress = 'n21Rvxijhp9u8ubkWYotFPDnWLfGnpWgXSy';
// const contractAddress = 'n1mhwrNzZgrFDUTKJAZjhMD71DBRMeWDu9J';
const contractAddress = 'n1jT2w44HcCUtWrR8RxVuwVpk89KhN15GUC';
const neb = new Nebulas.Neb();
const chainID = 1001;
const nebPay = new NebPay();
neb.setRequest(new Nebulas.HttpRequest("https://testnet.nebulas.io"));
// neb.setRequest(new Nebulas.HttpRequest("https://mainnet.nebulas.io"));

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		// score: 0,
		// misses: 0,
		// missesTgt: 0,
		playing: false,
		now: {
			score: 0,
			hits: 0,
			misses: 0,
			missesTgt: 0,
			totalTarget: 0
		},
		hasWalletExt: false,
		userAddress: '',
		best: {
			exactScore: 0,
			exactMisses: 0,
			exactMissesTgt: 0,
			pressScore: 0,
			pressMisses: 0,
			pressMissesTgt: 0,
		}
	},
	mutations: {
		[types.ADD_SCORE](state,payload){
			if(state.playing){
				state.now.score += 300;
				state.now.hits += 1;
			}
		},
		[types.CLEAR_SCORE](state,payload){
			state.now = {
				score: 0,
				hits: 0,
				misses: 0,
				missesTgt: 0,
				totalTarget: 0
			};
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
		},
		[types.SET_SCORE](state, payload){
			state.best = payload;
		},
		[types.ADD_MISSES](state,payload){
			if(state.playing){
				state.now.misses += 1;
			}
		},
		[types.ADD_TOTAL_TARGET](state,payload){
			if(state.playing){
				state.now.totalTarget += 1;
			}
		},
		[types.ADD_MISSES_TARGET](state,payload){
			if(state.playing){
				state.now.missesTgt += 1;
			}
		},
		[types.SET_PLAYING](state,payload){
			state.playing = payload.playingState;
		},


	},
	actions: {
		[types.GET_USER_ADDRESS]({commit, state, dispatch}){
			return new Promise((resolve, reject)=>{
				console.log("********* get account ************")
			    window.postMessage({
			        "target": "contentscript",
			        "data":{
			        },
			        "method": "getAccount",
			    }, "*");
			    let listenerFunc = function(e) {
				    if (!!e.data.data && !!e.data.data.account) {
				        resolve({userAddress: e.data.data.account})
				    }
				}
			    window.removeEventListener('message', listenerFunc);
			    window.addEventListener('message',listenerFunc);
			})
			
		},
		[types.GET_ACCOUNT_STATE]({commit, state, dispatch}){
			return new Promise((resolve, reject) => {
				neb.api.getAccountState(state.userAddress)
				.then(
					res => {resolve(res)},
					err => {reject(err);}
				)
			})
		},
		[types.GET_STORE]({commit, state}, res){
			// 使用call方法（不花费手续费）
			return new Promise((resolve, reject) => {
				neb.api.call({
	            	chainID,
	            	from: state.userAddress,
	            	to: contractAddress,
	            	value: 0,
	            	nonce: parseInt(res.nonce) + 1,
	            	gasPrice: 1000000,
				   	gasLimit: 2000000,
				   	contract: {
				       function: "getScore",
				       args: "[0]"
				   }
	            }).then(
	            	res => {
	            		let result = JSON.parse(res.result || res);
	            		resolve(result);
	            	},
	            	err => {
						reject(err);
					}
	            )
			})

			// 使用直接向合约发送数据的方法（花费手续费）
			// return new Promise( (resolve, reject) => {
			// 	let param = 0;
			// 	let callRes = nebPay.call(contractAddress, 0, 'balanceOf', `[${param}]`, {
			// 		qrcode: {
		 //                showQRCode: false
		 //            },
		 //            extension: {
			// 			openExtension: true //是否支持插件调用
			// 		},
		 //            callback: NebPay.config.testnetUrl,
		 //            listener: function(serialNumber, result){
		 //            	console.log(serialNumber, '【serialNumber】')
		 //            	console.log(result, '【result】')

		 //            	const intervalQuery = setInterval(function() {
			// 	            funcIntervalQuery();
			// 	        }, 5000);

		 //            	function funcIntervalQuery(){
		 //            		// 使用nebpay接口 
			// 		        // nebPay.queryPayInfo(serialNumber, {callback: NebPay.config.testnetUrl})
			// 	         //    .then(
			// 	         //    	res => {
			// 		        //         let respObject = JSON.parse(res)
			// 		        //         console.log(respObject, '【respObject111】')
			// 		        //         if(respObject.code === 0 && respObject.data.status === 1){                    
			// 		        //             clearInterval(intervalQuery)
			// 		        //         }
			// 	         //    	},
			// 	         //    	err => {console.log(err, '【err222】')}
			// 	         //    )

			// 	         	// 使用nebjs接口查询
			// 	         	neb.api.getTransactionReceipt(result.txhash)
			// 	         	.then(
			// 	         		res => {
			// 	         			if(res.status === 1){
			// 	         				console.log(res, '【res getTransactionReceipt】');
			// 	         				clearInterval(intervalQuery);
			// 	         				resolve(res);
			// 	         			}
			// 	         		},
			// 	         		err => {
			// 	         			console.log(err, '【err getTransactionReceipt】')
			// 	         			clearInterval(intervalQuery);
			// 	         			reject(err);
			// 	         		}
			// 	         	)
			// 		    }
		 //            }
			// 	})
			// })
		},
		[types.SAVE_STORE]({commit, state}, payload={type: 'exact'}){
			console.log(payload, '【payload】')
			// let value = payload.value;
			let value = JSON.stringify({
				score: parseInt(state.best.exactScore)+1,
	            misses: state.now.misses,
	            missesTgt: state.now.missesTgt
			});
			let type = payload.type;
			return new Promise((resolve, reject) =>{
				nebPay.call(contractAddress, 0, 'saveScore',JSON.stringify([value, type]), {
					qrcode: {showQRCode: false},
					extension: {openExtension: true},
					callback: NebPay.config.testnetUrl,
					listener: (serialNumber, result)=>{
						const intervalQuery = setInterval(()=>{
							funcIntervalQuery();
						}, 2000)
						function funcIntervalQuery(){
							neb.api.getTransactionReceipt(result.txhash)
							.then(
								res => {
									if(res.status === 1 || res.status === 0){
										console.log(res, '【res getTransactionReceipt】');
										clearInterval(intervalQuery);
										resolve(res);
									}
								},
								err => {
									console.log(err, '【err getTransactionReceipt】')
									clearInterval(intervalQuery);
									reject(err);
								}
							)
						}
					}
				})
			})
		},
		[types.GET_NUM_OF_PLAYER]({commit, state}, payload){
			return new Promise((resolve, reject)=>{
				neb.api.call({
	            	chainID,
	            	from: state.userAddress,
	            	to: contractAddress,
	            	value: 0,
	            	nonce: parseInt(payload.nonce) + 1,
	            	gasPrice: 1000000,
				   	gasLimit: 2000000,
				   	contract: {
				       function: "getDataSize",
				       args: "[0]"
				   }
	            }).then(
	            	res => {
	            		// let result = JSON.parse(res.result || res);
	            		console.log(res, '【GET_NUM_OF_PLAYER res】')
	            		resolve(res);
	            	},
	            	err => {
	            		console.log(err, '【GET_NUM_OF_PLAYER err】')
						reject(err);
					}
	            )
			})
		},
		[types.FOR_EACH]({commit, state}, payload){
			return new Promise((resolve, reject) => {
				neb.api.call({
	            	chainID,
	            	from: state.userAddress,
	            	to: contractAddress,
	            	value: 0,
	            	nonce: parseInt(payload.nonce) + 1,
	            	gasPrice: 1000000,
				   	gasLimit: 2000000,
				   	contract: {
				       function: "forEach",
				       args: "[10, 0]"
				   }
	            }).then(
	            	res => {
	            		// let result = JSON.parse(res.result || res);
	            		console.log(res, '【FOR_EACH res】')
	            		resolve(res);
	            	},
	            	err => {
	            		console.log(err, '【FOR_EACH err】')
						reject(err);
					}
	            )
			})
		}
	}
})

export default store