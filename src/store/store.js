import Vue from 'vue'
import Vuex from 'vuex'
import * as types from "./type.js"
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		score: 0
	},
	mutations: {
		[types.ADD_SCORE](state,payload){
			state.score = state.score + 1;
			// console.log('233333333333')
			console.log(state.score, 'state.score')
		}
	}
})

export default store