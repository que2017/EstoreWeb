<template>
    <div class="product-container">
		<productcard class="product-item" v-for="item in listProduct" :product="item"></productcard>
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
		width 100%
		.product-item
			cursor pointer
			margin 2rem
</style>
