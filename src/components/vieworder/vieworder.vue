<template>
    <div>
		<div class="view-order-empty" v-if="orderList.length <= 0">
			暂无订单~~现在去<el-link style="font-size: 1.2rem;" type="primary" @click="jumpToPage('cartproduct')">下单</el-link>
		</div>
		<vieworderitem class="view-order-wrapper" v-for="item in orderList" :order="item"></vieworderitem>
	</div>
</template>

<script>
	import vieworderitem from './vieworderitem.vue'
	
    export default {
        data () {
            return {
				orderList: []
			} 
        },
        methods: {
            jumpToPage(param) {
            	this.$router.push(param);
            }
        },
		created() {
			this.$http.get('Estore/servlet/ListAllOrderServlet').then(res => {
				this.orderList = eval('(' + res.bodyText + ')');
			});
		},
		components: {
			vieworderitem
		}
    } 
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.view-order-empty
		font-size 1.2rem
		font-weight bold
	.view-order-wrapper
		margin-bottom 1.5rem
		box-shadow 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
</style>
