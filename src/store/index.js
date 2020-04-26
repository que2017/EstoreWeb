import Vue from 'vue'
import Vuex from 'vuex'
import VuexAlong from 'vuex-along'
import cartproductData from './modules/cartproduct-data.js'
import payOrderData from './modules/payorder-data.js'

Vue.use(Vuex)
const debug = process.env.NODE_EVN !== 'production'

// VuexAlong用来使store的数据持久化，这样刷新界面后store的数据还能存在
export default new Vuex.Store({
	modules: {
		cartproductData,
		payOrderData
	},
	plugins: [VuexAlong()],
	strict: debug
})