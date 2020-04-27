<template>
    <div>
		<el-form :model="ruleForm" style="margin: 0 1rem;">
			<div class="payorder-text">订单号：<span style="font-weight: bold;">{{order.id}}</span></div>
			<div class="payorder-text">支付金额：<span style="font-weight: bold;color: red;">￥{{order.money}}</span></div>
			<div class="payorder-bank-wrapper">
				<div class="payorder-text">请选择支付银行：</div>
				<div class="payorder-bank-list">
					<div class="payorder-bank">
						<el-radio v-model="ruleForm.pd_FrpId" label="CMBCHINA-NET-B2C">招商银行</el-radio>
						<el-radio v-model="ruleForm.pd_FrpId" label="ICBC-NET">工商银行</el-radio>
						<el-radio v-model="ruleForm.pd_FrpId" label="ABC-NET">农业银行</el-radio>
						<el-radio v-model="ruleForm.pd_FrpId" label="CCB-NET">建设银行</el-radio>
					</div>
					<div class="payorder-bank">
						<el-radio v-model="ruleForm.pd_FrpId" label="CMBC-NET">中国民生银行总行</el-radio>
						<el-radio v-model="ruleForm.pd_FrpId" label="CEB-NET">光大银行</el-radio>
						<el-radio v-model="ruleForm.pd_FrpId" label="BOCO-NET">交通银行</el-radio>
						<el-radio v-model="ruleForm.pd_FrpId" label="SDB-NET">深圳发展银行</el-radio>
					</div>
					<div class="payorder-bank">
						<el-radio v-model="ruleForm.pd_FrpId" label="BCCB-NET">北京银行</el-radio>
						<el-radio v-model="ruleForm.pd_FrpId" label="CIB-NET">兴业银行</el-radio>
						<el-radio v-model="ruleForm.pd_FrpId" label="SPDB-NET">上海浦东发展银行</el-radio>
						<el-radio v-model="ruleForm.pd_FrpId" label="ECITIC-NET">中信银行</el-radio>
					</div>
				</div>
			</div>
			<el-button type="primary" @click="payOrder()">支付订单</el-button>
		</el-form>
		<form v-if="showConfirm" class="yeepay-form-mask" action='https://www.yeepay.com/app-merchant-proxy/node' method="post">
			<input type="hidden" name="pd_FrpId" :value="yeepayData.pd_FrpId" />
			<input type="hidden" name="p0_Cmd" :value="yeepayData.p0_Cmd" />
			<input type="hidden" name="p1_MerId" :value="yeepayData.p1_MerId" />
			<input type="hidden" name="p2_Order" :value="yeepayData.p2_Order" />
			<input type="hidden" name="p3_Amt" :value="yeepayData.p3_Amt" />
			<input type="hidden" name="p4_Cur" :value="yeepayData.p4_Cur" />
			<input type="hidden" name="p5_Pid" :value="yeepayData.p5_Pid" />
			<input type="hidden" name="p6_Pcat" :value="yeepayData.p6_Pcat" />
			<input type="hidden" name="p7_Pdesc" :value="yeepayData.p7_Pdesc" />
			<input type="hidden" name="p8_Url" :value="yeepayData.p8_Url" />
			<input type="hidden" name="p9_SAF" :value="yeepayData.p9_SAF" />
			<input type="hidden" name="pa_MP" :value="yeepayData.pa_MP" />
			<input type="hidden" name="pr_NeedResponse" :value="yeepayData.pr_NeedResponse" />
			<input type="hidden" name="hmac" :value="yeepayData.hmac" />
			<div class="yeepay-form-button">
				<input class="yeepay-form-pay" type="submit" value="确认支付" />
				<input type="button" value="取消支付" @click="cancelPay()"/>
			</div>
		</form>
	</div>
</template>

<script>
    export default {
        data () {
            return {
				order: null,
				ruleForm: {
					orderId: '',
					pd_FrpId: ''
				},
				showConfirm: false,
				yeepayData: {}
			} 
        },
        methods: {
            payOrder() {
				// 判断是否选择了银行
				if (this.ruleForm.pd_FrpId === '') {
					this.$message.error('请选择支付银行！');
					return;
				}
				// 准备订单数据
				let arr = [];
				for (let key in this.ruleForm) {
					arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(this.ruleForm[key]));
				}
				// 向服务器提交数据
				this.$http.post('Estore/servlet/PayOrderServlet', arr.join('&'), {
					'headers': {
						'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
					}
				}).then(res => {
					// 将服务器返回的数据通过post请求易宝进行支付
					this.yeepayData = eval('(' + res.bodyText + ')');
					console.log(this.yeepayData);
					this.showConfirm = true;
				}, err => {
					this.$message.error('支付失败，请稍后重试！');
				})
			},
			cancelPay() {
				this.showConfirm = false;
			}
        },
		created() {
			this.order = this.$store.state.payOrderData.orderData;
			this.ruleForm.orderId = this.order.id;
		}
    } 
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.payorder-text
		margin 1rem 0
		font-size 1.2rem
	.payorder-bank-wrapper
		padding 1rem
		margin-bottom 1rem
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
	.payorder-bank-list
		display flex
		flex-direction row
		.payorder-bank
			display flex
			flex-direction column
			justify-content space-between
			height 6rem
	.yeepay-form-mask
		display flex
		flex-direction column
		justify-content center
		position absolute
		left 0
		top 0
		z-index 10
		width 100%
		height 100%
		background-color #ccc
		opacity 0.9
		.yeepay-form-button
			display flex
			align-content center
			justify-content center
			input
				display inline-block
				width 6.125rem
				height 2.5rem
				font-size 0.875rem
				border-radius 4px
				font-weight bold
				cursor pointer
			input:hover
				color #409EFF
				border-color #c6e2ff
				background-color #ecf5ff
			.yeepay-form-pay
				color white
				background-color #409EFF
				margin-right 1rem
			.yeepay-form-pay:hover
				color #FFF
				border-color #66b1ff
				background-color #66b1ff
</style>
