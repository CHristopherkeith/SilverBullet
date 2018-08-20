import Vue from 'vue'
import Vuex from 'vuex'
import * as types from "./type.js"
Vue.use(Vuex)
console.log(types.ADD_SCORE, 'type')

const store = new Vuex.Store({
	state: {
		score: 0
	},
	mutations: {
		[types.ADD_SCORE](state,payload){
			state.score = state.score + 1;
			// console.log(state.score, 'state.score')
		},
		[types.CLEAR_SCORE](state,payload){
			state.score = 0;
			// console.log(state.score, 'state.score')
		}
	}
})

export default store