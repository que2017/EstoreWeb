<template>
    <div v-loading.fullscreen.lock="loading" element-loading-text="正在激活..." >
		<el-form v-show="showSendAgain" :model="ruleForm" ref="ruleForm" :rules="rules" class="demo-ruleForm">
			<el-form-item label="邮箱" prop="email">
				<el-input v-model="ruleForm.email"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="sendActiveCode('ruleForm')">重新发送</el-button>
				<el-button>返回主页</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
    export default {
        data () {
            return {
				loading: true,
				showSendAgain: false,
				ruleForm: {
					email: ''
				},
				rules: {
					email: [
						{
							validator: (rule, value, callback) => {
								if (value === '') {
									callback(new Error('邮箱不能为空！'));
								} else {
									// 校验邮箱格式
									let reg = /^\w+@\w+(\.\w+)+$/;
									if (!reg.test(value)) {
										callback(new Error('邮箱格式不正确！'));
									} else {
										callback();
									}
								}
							},
							trigger: 'blur',
							required: true
						}
					]
				}
			}
        },
		methods: {
			sendActiveCode(formName) {
				let data = this.ruleForm;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let arr = [];
						for (let key in data) {
							arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
						}
						// 提交数据
						this.$http.post('/Estore/servlet/SendActiveCodeServlet', arr.join('&'), {
							'headers': {
								'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
							},
						}).then(res => {
							let resData = eval('(' + res.bodyText + ')');
							if (resData.result === 'succ') {
								// 弹出消息提醒
								this.$message({
									message: '激活邮件发送成功！请到邮箱查看并激活！',
									type: 'success'
								});
								setTimeout(() => {
									this.loading = false;
									this.$router.push('welcome');
								}, 2000);
							} else {
								switch (resData.code) {
									case '401':
										this.$message.error('邮箱未注册，请确认邮箱地址是否正确！');
										break;
									case '402':
										this.$message.error('此邮箱对应用户已经激活，请确认邮箱地址是否正确！');
										break;
									case '403':
										this.$message.error('激活邮件发送失败，请稍后再试！');
										break;
									default:
										break;
								}
							}
						}), err => {
							this.$message.error('激活邮件发送失败，请稍后再试！');
						};
					} else {
						return false;
					}
				});
			}
		},
        created() {
			let activecode = this.$route.query.activecode;
        	this.$http.get('/Estore/servlet/ActiveUserServlet', {params: {activecode}}).then(res => {
				let resData = eval('(' + res.bodyText + ')');
				if (resData.result === 'succ') {
					// 弹出消息提醒
					this.$message({
						message: '恭喜你，用户激活成功！',
						type: 'success'
					});
					setTimeout(() => {
						this.loading = false;
						this.$router.push('welcome');
					}, 2000);
				} else {
					switch (resData.code) {
						case '301':
							this.$message.error('激活链接不正确，请确认激活链接后重试！');
							break;
						case '302':
							this.$message.error('激活链接已失效，请重新发送激活链接！');
							break;
						default:
							break;
					}
					this.loading = false;
					this.showSendAgain = true;
				}
			}, err => {
				this.$message.error('用户激活失败，请确认激活链接是否正确！');
				this.loading = false;
				this.showSendAgain = true;
			});
        }
    } 
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
