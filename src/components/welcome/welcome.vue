<template>
    <div>
		<h2 v-show="!userChecked">欢迎来到Estore商城！您可以：</h2>
		<h2 v-show="userChecked">欢迎回来，{{username}}！您可以：</h2>
		<div>
			<el-button v-show="!userChecked" type="primary" @click="jumpToPage('login')">登陆</el-button>
			<el-button v-show="!userChecked" @click="jumpToPage('regist')">注册</el-button>
			<el-button v-show="userChecked" type="primary" @click="jumpToPage('addproduct')">添加商品</el-button>
			<el-button v-show="userChecked" type="primary" @click="jumpToPage('listproduct')">商品列表</el-button>
			<el-button v-show="userChecked" type="primary" @click="jumpToPage('cartproduct')">查看购物车</el-button>
			<el-button v-show="userChecked" type="primary" @click="jumpToPage('vieworder')">查看订单</el-button>
			<a class="download-salelist" href="Estore/servlet/SaleListServlet">
				<el-button v-show="userChecked" type="primary">销售榜单</el-button>
			</a>
			<el-button v-show="userChecked" @click="logout()">注销</el-button>
		</div>
	</div>
</template>

<script>
    export default {
        data () {
            return {
				userChecked: false,
				username: ''
			}
        },
        methods: {
            jumpToPage(page) {
				this.$router.push(page);
			},
			logout() {
				this.$http.get('/Estore/servlet/LogoutServlet').then(res => {
					this.$router.go(0);
				}, err => {
					this.$router.go(0);
				})
			},
			downloadSaleList() {
				
			}
        },
		created() {
			console.log('created');
			this.$http.get('/Estore/servlet/CheckSessionServlet').then(res => {
				let resData = eval('(' + res.bodyText + ')');
				if (resData.result === 'succ') {
					this.userChecked = true;
					this.username = resData.user.username;
				} else {
					this.userChecked = false;
				}
			}, err => {
				this.userChecked = false;
			});
		}
    } 
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.download-salelist
		display inline-block
		padding 0 10px
</style>
