<template>
    <div>
		<div class="vieworder-info">
			<span class="vieworder-text">{{order.ordertime.substring(0, 16)}}</span>
			<span class="vieworder-text">订单号：{{order.id}}</span>
			<span class="vieworder-text vieworder-price">￥{{(order.money * 0.1).toFixed(2)}}</span>
			<span class="vieworder-text" :class="{'vieworder-paystate-no' : order.state !== 1,'vieworder-paystate-yes': order.state === 1}">{{order.state === 1 ? '已支付' : '未支付'}}</span>
		</div>
		<div class="vieworder-payorder">
			<div class="vieworder-addr">收货地址：{{order.receiverinfo}}</div>
			<el-button type="primary" size="small">支付订单</el-button>
			<el-button type="danger" size="small">删除订单</el-button>
		</div>
		<div>
			
		</div>
	</div>
</template>

<script>
	import orderitem from '../order/orderitem.vue'
	
    export default {
		props: {
			order: Object
		},
        data () {
            return {
				productList: []
			} 
        },
        methods: {
            
        },
		created() {
			
		},
		components: {
			orderitem
		}
    } 
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.vieworder-info
		display flex
		flex-direction row
		justify-content space-between
		padding 1rem 0
		background-color #ccc
		.vieworder-text
			font-size 1.2rem
			font-weight bold
			margin 0 1rem
		.vieworder-price
			color red
		.vieworder-paystate-no
			color red
		.vieworder-paystate-yes
			color green
	.vieworder-payorder
		display flex
		flex-direction row
		padding 1rem
		.vieworder-addr
			display flex
			flex-direction column
			justify-content center
			flex-grow 1
			font-size 1.2rem
			font-weight bold
</style>
