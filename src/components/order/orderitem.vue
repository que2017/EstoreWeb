<template>
    <div class="order-item-wrapper">
		<span class="order-item-text">{{product.name}}</span>
		<span class="order-item-text">{{product.category}}</span>
		<span class="order-item-text">￥{{product.price}}</span>
		<span class="order-item-text">{{product.num}}</span>
		<span class="order-item-text" style="color: red;">￥{{(product.price * product.num).toFixed(2)}}</span>
	</div>
</template>

<script>
    export default {
		props: {
			product: Object
		},
        data () {
            return {} 
        },
        methods: {
            
        }
    } 
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.order-item-wrapper
		display flex
		flex-direction row
		align-items center
		flex-wrap nowrap
		padding 1rem 0
		border-bottom #8C939D solid 0.0625rem
		.order-item-text
			width 8rem
			text-align center
			font-size 1.2rem
</style>
