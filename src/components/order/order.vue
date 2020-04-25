<template>
    <div class="order-wrapper">
		<div>
			<el-input style="width: 20rem;" type="textarea" :autosize="{minRows: 3}" placeholder="请输入地址" v-model="address"></el-input>
			<el-button style="margin-left: 2rem;" type="primary" @click="submitOrder()">提交订单</el-button>
		</div>
		<span class="order-detail-head">商品详情</span>
		<orderlist :productList="cartDataList"></orderlist>
	</div>
</template>

<script>
	import orderlist from './orderlist.vue'
	
    export default {
        data () {
            return {
				address: '',
				cartDataList: []
			} 
        },
        methods: {
            submitOrder() {
				if (this.address === '') {
					this.$message.error('请输入地址!');
					return;
				}
				this.$http.get('/Estore/servlet/AddOrderServlet', {params:{'address': this.address}}).then(res => {
					let data = eval('(' + res.bodyText + ')');
					if (data.result === 'succ') {
						this.$message({
							message: '订单创建成功！',
							type: 'success'
						});
						// 跳转支付界面
					} else {
						this.$message.error('订单创建失败，请稍后重试！');
						this.$router.push('cartproduct');
					}
				});
			}
        },
		created() {
			this.cartDataList = this.$store.state.cartproductData.cartData;
			console.log(this.cartDataList);
		},
		components: {
			orderlist
		}
    } 
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.order-wrapper
		display flex
		flex-direction column
		.order-detail-head
			margin 1rem 0
			font-size 1.6rem
			font-weight bold
			text-align center
</style>
