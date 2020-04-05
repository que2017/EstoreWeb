<template>
  <div id="app">
	  <div class="container">
		<Login></Login>
	  </div>
  </div>
</template>

<script>
	import Regist from './components/regist/regist.vue'
	import Login from './components/login/login.vue'
	
	export default {
		name: 'app',
		components: {
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
		justify-content center
		.container
			display flex
			align-content center
			justify-content center
</style>
