<template>
	<div>
		<div v-show="cartDataList.length <= 0" style="font-size: 1.2rem;">购物车空空如也~~ 先去<el-link style="font-size: 1.2rem;" type="primary" @click="jumpToPage('listproduct')">挑点东西吧</el-link></div>
		<div v-show="cartDataList.length > 0">
			<div class="product-head">
				<span class="product-img">缩略图</span>
				<span class="product-text">商品名称</span>
				<span class="product-text">商品种类</span>
				<span class="product-text">商品单价</span>
				<span class="product-num">购买数量</span>
				<span class="product-text">库存状态</span>
				<span class="product-total">总价</span>
				<span class="product-delete">操作</span>
			</div>
			<cartproductitem v-for="item in cartDataList" :product="item"></cartproductitem>
			<div class="total-price">
				<div class="clear-cart">
					<el-button type="danger" @click="clearCart()">清空购物车</el-button>
				</div>
				<div class="product-total-price">总计：<span style="color: red;">￥{{getTotalProce()}}</span></div>
				<el-button type="primary" @click="jumpToPage('order')">生成订单</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import cartproductitem from './cardproductitem.vue'
	
    export default {
        data () {
            return {
				cartDataList: []
			}
        },
        methods: {
            jumpToPage(param) {
				this.$router.push(param);
			},
			getTotalProce() {
				let price = 0;
				for(let i = 0; i < this.cartDataList.length; i++) {
					price += this.cartDataList[i].price * this.cartDataList[i].num;
				}
				return price;
			},
			clearCart() {
				this.$http.get('/Estore/servlet/ClearCartServlet').then(res => {
					this.$router.go(0);
				}, err => {
					this.$router.go(0);
				})
			}
        },
		created() {
			this.$http.get('/Estore/servlet/ListCartProductServlet').then(res => {
				this.cartDataList = eval('(' + res.bodyText + ')').cartproductlist;
				this.$store.dispatch('setCartData', this.cartDataList);
			});
		},
		components: {
			cartproductitem
		}
    } 
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.product-head
		display flex
		flex-direction row
		align-items center
		flex-wrap nowrap
		border-bottom #666 solid 1px
		padding 1rem 0
		.product-img
			width 9.5rem
			font-size 1.2rem
			text-align center
		.product-num
			width 200px
			font-size 1.2rem
			text-align center
		.product-text
			width 8rem
			font-size 1.2rem
			text-align center
		.product-total
			width 6rem
			font-size 1.2rem
			text-align center
		.product-delete
			width 70px
			font-size 1.2rem
			text-align center
	.total-price
		display flex
		flex-direction row
		margin 2rem 0
		.clear-cart
			flex-grow 1
			margin-left 2rem
		.product-total-price
			width 14rem
			font-size 1.5rem
			font-weight bold
</style>
