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
		score: 0,
		hasWalletExt: false,
		userAddress: ''
	},
	mutations: {
		[types.ADD_SCORE](state,payload){
			state.score = state.score + 300;
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
			        commit('SET_USER_ADDRESS', {
			        	userAddress: e.data.data.account
			        });
			        /********************************************/ 
			        // 链式写法：多个then放在GET_ACCOUNT_STATE【内】
			        /********************************************/ 
			        // dispatch('GET_ACCOUNT_STATE').then(
			        //   res => {console.log(res,'【res】')},
			        //   err=>{console.log(err,'【err】');}
			        // );

			        /********************************************/ 
			        // 链式写法：多个then放在GET_ACCOUNT_STATE【外】
			        /********************************************/ 
			        dispatch('GET_ACCOUNT_STATE').then(
			          res => {dispatch('FOR_EACH', res);dispatch('GET_NUM_OF_PLAYER', res);return dispatch('GET_STORE', res)},
			          err=>{console.log(err,'【err1】');}
			        ).then(
			          res => {console.log(res,'【res2】');},
			          err=>{console.log(err,'【err2】');}
			        )
			    }
			}
		    window.removeEventListener('message', listenerFunc);
		    window.addEventListener('message',listenerFunc);
		},
		[types.GET_ACCOUNT_STATE]({commit, state, dispatch}){
			/********************************************/ 
	        // 链式写法：多个then放在GET_ACCOUNT_STATE【内】
	        /********************************************/ 
			// return new Promise((resolve, reject) => {
			// 	neb.api.getAccountState(state.userAddress)
			// 	.then(
			// 		res => {dispatch('GET_STORE', res)},
			// 		err => {reject(err);}
			// 	).then(
			// 		res => {resolve(res);},
			// 		err => {reject(err);}
			// 	)
			// })

			/********************************************/ 
	        // 链式写法：多个then放在GET_ACCOUNT_STATE【外】
	        /********************************************/ 
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
				       // function: "balanceOf",
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
				score: state.score,
	            misses: 0,
	            missesTgt: 0
			});
			let type = payload.type;
			// let valueArgs = `["${value}", "${type}"]`;
			// let valueArgsStr = '["'+value+'","'+type+'"]';
			// let valueArgsArr = [value, type];
			// let valueArgsStr = 

			// console.log(valueArgs, '【valueArgs】')
			// console.log(valueArgsStr, '【valueArgsStr】')
			// console.log(JSON.stringify(valueArgsStr), '【valueArgsStr】')
			return new Promise((resolve, reject) =>{
				nebPay.call(contractAddress, 0, 'saveScore',JSON.stringify([value, type])/*'[\"{\"score\": \"0\",\"misses\": \"0\",\"missesTgt\": \"0\"}\",\"exact\"]'*//*'["{\\"score\\": 0}"]'*/, {
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