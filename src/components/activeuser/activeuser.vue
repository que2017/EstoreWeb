<template>
    <div v-loading.fullscreen.lock="loading" element-loading-text="正在激活..." ></div>
</template>

<script>
    export default {
        data () {
            return {
				loading: true
			}
        },
        created() {
			let activecode = this.$route.query.activecode;
        	this.$http.get('/Estore/servlet/ActiveUserServlet', {params: {activecode}}).then(res => {
				// 弹出消息提醒
				this.$message({
					message: '恭喜你，用户激活成功！',
					type: 'success'
				});
				setTimeout(() => {
					this.loading = false;
					this.$router.push('welcome');
				}, 2000);
			}, err => {
				this.$message.error('用户激活失败，请确认激活链接是否正确！');
				setTimeout(() => {
					this.loading = false;
					this.$router.push('welcome');
				}, 2000);
			});
        }
    } 
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
