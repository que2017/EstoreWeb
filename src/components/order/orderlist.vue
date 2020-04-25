<template>
    <div>
		<div class="order-detail">
			<div class="order-item-head">
				<span class="order-text">商品名称</span>
				<span class="order-text">商品种类</span>
				<span class="order-text">商品单价</span>
				<span class="order-text">购买数量</span>
				<span class="order-text">总价</span>
			</div>
			<orderitem v-for="item in productList" :product="item"></orderitem>
		</div>
	</div>
</template>

<script>
	import orderitem from './orderitem.vue'
	
    export default {
		props: {
			productList: Array
		},
        data () {
            return {} 
        },
        methods: {
            
        },
		components: {
			orderitem
		}
    } 
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.order-detail
		display flex
		flex-direction column
		.order-item-head
			display flex
			flex-direction row
			justify-content space-between
			align-items center
			flex-wrap nowrap
			padding 1rem 0
			border-bottom #666 solid 0.0625rem
		.order-text
			width 8rem
			text-align center
			font-size 1.2rem
			font-weight bold
</style>
