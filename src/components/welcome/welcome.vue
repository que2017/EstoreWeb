<template>
    <div>
		<h2>欢迎来到Estore商城！您可以：</h2>
		<div>
			<el-button type="primary" @click="jumpToPage('login')">登陆</el-button>
			<el-button @click="jumpToPage('regist')">注册</el-button>
		</div>
	</div>
</template>

<script>
    export default {
        data () {
            return {
				
			}
        },
        methods: {
            jumpToPage(page) {
				this.$router.push(page);
			}
        }
    } 
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
