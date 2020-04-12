<template>
    <div class="wrapper">
		<div class="img-wrapper">
			<img class="product-img" :src="getImage(data.imgurl)" />
		</div>
		<div class="detail-info">
			<span class="product-text">商品名称：{{data.name}}</span>
			<span class="product-text">商品单价：￥{{data.price}}</span>
			<span class="product-text">商品分类：{{data.category}}</span>
			<span class="product-text">库存数量：{{data.pnum}}件</span>
			<span class="product-text">描述信息：{{data.description}}</span>
			<el-button type="primary" @click="addToCart(data.id)">加入购物车</el-button>
		</div>
	</div>
</template>

<script>
    export default {
        data () {
            return {
				data: Object
			} 
        },
        methods: {
            getImage(url) {
				if (url === undefined) {
					return '';
				}
				return '/Estore/servlet/ProductImgServlet?imgurl=' + url;
			},
			addToCart(id) {
				console.log(id);
			}
        },
		created() {
			let id = this.$route.query.id;
			this.$http.get('/Estore/servlet/ProductDetailServlet', {params: {id}}).then(res => {
				this.data = eval('(' + res.bodyText + ')');
			});
		}
    } 
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.wrapper
		display flex
		flex-direction row
		margin-top 2rem
		.img-wrapper
			display flex
			justify-content center
			flex-direction column
			width 25rem
			height 37.5rem
			box-shadow 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
			.product-img
				width auto
				height auto
				max-width 100%
				max-height 100%
		.detail-info
			display flex
			flex-direction column
			justify-content flex-end
			margin 2rem
			.product-text
				margin-bottom 1rem
				font-size 1.2rem
				font-weight bold
</style>
