<template>
	<div>
		<el-form :model="ruleForm" ref="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="ruleForm.username"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input v-model="ruleForm.password" type="password"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="doLogin('ruleForm')">登陆</el-button>
				<el-button @click="doReset('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				ruleForm: {
					username: '',
					password: ''
				},
				rules: {
					username: [
						{
							validator: (rule, value, callback) => {
								if (value === '') {
									callback(new Error('请输入用户名！'));
								} else {
									callback();
								}
							},
							trigger: 'blur',
							required: true
						}
					],
					password: [
						{
							validator: (rule, value, callback) => {
								if (value === '') {
									callback(new Error('请输入密码！'));
								} else {
									callback();
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
			doLogin(fromName) {
				let data = this.ruleForm;
				this.$refs[fromName].validate((value) => {
					if (value) {
						console.log('表单校验成功！');
						// 准备数据
						let arr = [];
						for (let key in data) {
							arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
						}
						// 执行登陆请求操作
						this.$http.post('/servlet/LoginServlet', arr.join('&'), {
							'headers': {
								'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
							}
						}).then(res => {
							// 弹出消息提醒登陆成功
							this.$message({
								message: '恭喜你，登陆成功！',
								type: 'success'
							});
							// 跳转到欢迎页
							this.$router.push('welcome');
						}, err => {
							// 弹出消息提醒登陆失败
							this.$message.error('登陆失败，请检查用户名和密码！');
						});
					} else {
						console.log('表单校验失败！');
						return false;
					}
				});
			},
			doReset(fromName) {
				this.$refs[fromName].resetFields();
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
