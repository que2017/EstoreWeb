<template>
    <div>
		<div class="order-detail">
			<span class="order-detail-head">商品详情</span>
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
			productList: Object
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
		.order-detail-head
			margin 1rem 0
			font-size 1.6rem
			font-weight bold
			text-align center
		.order-item-head
			display flex
			flex-direction row
			justify-content space-between
			align-items center
			flex-wrap nowrap
			padding-bottom 1rem
			border-bottom #666 solid 0.0625rem
		.order-text
			width 8rem
			text-align center
			font-size 1.2rem
			font-weight bold
</style>
