<template>
  <div id="app">
	  <div class="container">
		<regist></regist>
	  </div>
  </div>
</template>

<script>
	import regist from './components/regist/regist.vue'
	export default {
		name: 'app',
		components: {
			regist
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
