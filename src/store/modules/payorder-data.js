import * as type from '../motation-types.js'

const state = {
	orderData: {}
}

const getters = {}

const actions = {
	setOrderData({commit}, data) {
		commit(type.SET_ORDER_DATA, data)
	}
}

const mutations = {
	[type.SET_ORDER_DATA] (state, data) {
		state.orderData = data
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}