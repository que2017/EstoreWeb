<template>
    <div class="cartproduct-container">
		<div class="prod-img-wrapper">
			<img class="prod-img" :src="getImg(product.imgurl)" @click="jumpToProductDetail(product.id)"/>
		</div>
		<span class="prod-text">{{product.name}}</span>
		<span class="prod-text">{{product.category}}</span>
		<span class="prod-text">￥{{product.price}}</span>
		<el-input-number @change="changePNum(num, product.id)" size="medium" v-model="num" :min="1" :max="parseInt(product.pnum)"></el-input-number>
		<span class="prod-text">{{product.pnum}}</span>
		<span class="prod-total">￥{{(product.price * product.num).toFixed(2)}}</span>
		<el-button type="danger" @click="deleteProduct(product.id)">删除</el-button>
	</div>
</template>

<script>
    export default {
		props: {
			product: Object
		},
        data () {
            return {
				num: this.product.num
			} 
        },
        methods: {
            getImg(url) {
            	let lastDot = url.lastIndexOf('.');
            	return '/Estore/servlet/ProductImgServlet?imgurl=' + url.substring(0, lastDot) + '_s' + url.substring(lastDot);
            },
			jumpToProductDetail(productId) {
				this.$router.push('productdetail?id=' + productId);
			},
			deleteProduct(id) {
				this.$http.get('/Estore/servlet/DeleteCartProductServlet', {params:{id}}).then(res => {
					let data = eval('(' + res.bodyText + ')');
					if (data.result === 'succ') {
						this.$router.go(0)
					} else {
						this.$message.error('删除失败，商品未找到！')
					}
				}, err => {
					this.$message.error('删除失败，请稍后重试！');
				});
			},
			changePNum(num, id) {
				this.$http.get('/Estore/servlet/ChangeCartProductNumServlet', {params:{id,num}}).then(res => {
					let data = eval('(' + res.bodyText + ')');
					if (data.result === 'fail') {
						this.$router.go(0);
					} else {
						this.$store.dispatch('setCartProductNum', this.num);
					}
				}, err => {
					this.$router.go(0);
				});
			}
        }
    } 
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.cartproduct-container
		display flex
		flex-direction row
		align-items center
		flex-wrap nowrap
		border-bottom #CCC solid 1px
		.prod-img-wrapper
			display flex
			justify-content center
			flex-direction column
			width 8rem
			height 8rem
			margin 0.75rem
			.prod-img
				width auto
				height auto
				max-width 100%
				max-height 100%
				cursor pointer
		.prod-text
			width 8rem
			text-align center
			font-size 1.2rem
			font-weight bold
		.prod-total
			width 6rem
			font-size 1.2rem
			font-weight bold
			color red
</style>
