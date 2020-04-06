<template>
  <div id="app">
	  <div class="estore_header">
		  <h1>Estore</h1>
	  </div>
	  <div class="container">
		  <div class="content">
			  <router-view></router-view>
		  </div>
	  </div>
  </div>
</template>

<script>
	import Regist from './components/regist/regist.vue'
	import Login from './components/login/login.vue'
	import Welcome from './components/welcome/welcome.vue'
	
	export default {
		name: 'app',
		components: {
			Welcome,
			Login,
			Regist
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	#app
		height 100vh
		display flex
		flex-direction column
		.estore_header
			display flex
			flex-direction row
			justify-content center
			box-shadow 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
		.container
			display flex
			flex-direction column
			justify-content center
			flex-grow 1
			.content
				display flex
				align-content center
				justify-content center
</style>
