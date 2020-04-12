<template>
    <div class="product-container">
		<productcard v-for="item in listProduct" :product="item" @click.native="jumpToProductDetail(item.id)" class="product-item"></productcard>
	</div>
</template>

<script>
	import productcard from './productcard.vue'
	
    export default {
        data () {
            return {
				listProduct: []
			} 
        },
        methods: {
            jumpToProductDetail(productId) {
				this.$router.push('productdetail?id=' + productId);
			}
        },
		created() {
			this.$http.get('/Estore/servlet/ListAllProductServlet').then(res => {
				let data = eval('(' + res.bodyText + ')');
				this.listProduct = data.productlist;
			}, err => {
				
			})
		},
		components: {
			productcard
		}
    } 
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.product-container
		display flex
		flex-direction row
		flex-wrap wrap
		justify-content center
		width 100%
		.product-item
			cursor pointer
			margin 2rem
</style>
