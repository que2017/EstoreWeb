import * as type from '../motation-types.js'

const state = {
	cartData: []
}

const getters = {}

const actions = {
	setCartData({commit}, data) {
		commit(type.SET_CART_DATA, data)
	},
	setCartProductNum({commit}, num) {
		commit(type.SET_CART_PROD_NUM, num)
	}
}

const mutations = {
	[type.SET_CART_DATA] (state, data) {
		state.cartData = data
	},
	[type.SET_CART_PROD_NUM] (state, num) {
		state.cartData.num = num
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}