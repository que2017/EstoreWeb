import * as type from '../motation-types.js'

const state = {
	cartData: []
}

const getters = {}

const actions = {
	setCartData({commit}, data) {
		commit(type.SET_CART_DATA, data)
	},
	setCartProductNum({commit}, {id, num}) {
		commit(type.SET_CART_PROD_NUM, {id, num})
	}
}

const mutations = {
	[type.SET_CART_DATA] (state, data) {
		state.cartData = data
	},
	[type.SET_CART_PROD_NUM] (state, {id, num}) {
		for (let index = 0; index < state.cartData.length; index++) {
			if (id === state.cartData[index].id) {
				state.cartData[index].num = num;
				return;
			}
		}
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}