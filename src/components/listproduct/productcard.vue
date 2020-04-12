<template>
    <div class="card-wrapper">
		<img :src="getImg(product.imgurl)" class="prod-img"/>
		<div class="product-name">{{product.name}}</div>
		<div>
			<span class="product-category">{{product.category}}</span>
			<span class="product-pnum">{{product.pnum > 0 ? '有货' : '缺货'}}</span>
			<span class="product-price">￥{{product.price}}</span>
		</div>
	</div>
</template>

<script>
    export default {
		props: {
			product: Object
		},
        data () {
            return {}
        },
        methods: {
            getImg(url) {
				return '/Estore/servlet/ProductImgServlet?imgurl=' + url;
			}
        }
    } 
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.card-wrapper
		border 0.125rem solid #ccc
		border-radius 0.5rem
		padding-bottom 1rem
	.prod-img
		display block
		width 12.5rem
		height 12.5rem
		margin 0.75rem
	.product-name
		border-top 0.125rem solid black
		padding-top 0.75rem
		margin 0.75rem
		font-size 1.5rem
		font-weight bold
		color chocolate
		text-align center
	.product-category
		margin-left 0.75rem
		font-size 1rem
		color #8C939D
		font-weight bold
	.product-pnum
		margin-left 1rem
		color red
		font-weight bold
	.product-price
		margin 0 0.75rem 0 1rem
		font-size 1rem
		color #8C939D
		font-weight bold
</style>
