<template>
    <div>
		<div class="vieworder-info">
			<span class="vieworder-text">{{order.ordertime.substring(0, 16)}}</span>
			<span class="vieworder-text">订单号：{{order.id}}</span>
			<span class="vieworder-text vieworder-price">￥{{(order.money * 1.0).toFixed(2)}}</span>
			<span class="vieworder-text" :class="[order.paystate === '1' ? 'vieworder-paystate-yes' : 'vieworder-paystate-no']">{{order.paystate === '1' ? '已支付' : '未支付'}}</span>
		</div>
		<div class="vieworder-payorder">
			<div class="vieworder-addr">收货地址：{{order.receiverinfo}}</div>
			<el-button v-show="order.paystate !== '1'" type="primary" size="small" @click="payOrder()">支付订单</el-button>
			<el-button type="danger" size="small" @click="deleteOrder(order.id)">删除订单</el-button>
		</div>
		<orderlist :productList="order.productlist"></orderlist>
	</div>
</template>

<script>
	import orderlist from '../order/orderlist.vue'
	
    export default {
		props: {
			order: Object
		},
        data () {
            return {
				
			} 
        },
        methods: {
            payOrder() {
				this.$store.dispatch('setOrderData', this.order);
				this.$router.push('payorder');
			},
			deleteOrder(orderId) {
				this.$http.get('Estore/servlet/DeleteOrderServlet', {params:{orderId}}).then(res => {
					let data = eval('(' + res.bodyText + ')');
					if (data.result === 'succ') {
						this.$router.go(0);
					} else {
						this.$message.error('订单删除失败！');
					}
				})
			}
        },
		components: {
			orderlist
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
		background-color #ddd
		.vieworder-addr
			display flex
			flex-direction column
			justify-content center
			flex-grow 1
			font-size 1.2rem
			font-weight bold
</style>
