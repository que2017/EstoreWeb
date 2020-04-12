<template>
    <div>
		<div v-for="item in listProduct">
			{{item.name}}
		</div>
	</div>
</template>

<script>
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
		}
    } 
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
