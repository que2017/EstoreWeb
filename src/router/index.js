import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '../components/welcome/welcome.vue'
import Login from '../components/login/login.vue'
import Regist from '../components/regist/regist.vue'
import ActiveUser from '../components/activeuser/activeuser.vue'
import AddProduct from '../components/addproduct/addproduct.vue'
import ListProduct from '../components/listproduct/listproduct.vue'

Vue.use(VueRouter)

export default new VueRouter({
	routes: [
		{
			path: '/',
			redirect: {
				name: 'Welcome'
			}
		},
		{
			path: '/welcome',
			name: 'Welcome',
			component: Welcome
		},
		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		{
			path: '/regist',
			name: 'Regist',
			component: Regist
		},
		{
			path: '/activeuser',
			name: 'ActiveUser',
			component: ActiveUser
		},
		{
			path: '/addproduct',
			name: 'AddProduct',
			component: AddProduct
		},
		{
			path: '/listproduct',
			name: 'ListProduct',
			component: ListProduct
		}
	]
})