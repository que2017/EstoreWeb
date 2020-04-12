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
				<el-checkbox v-model="rememberUser">记住用户名</el-checkbox>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="doLogin('ruleForm')">登陆</el-button>
				<el-button @click="doReset('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import md5 from 'js-md5';
	
	export default {
		data () {
			return {
				rememberUser: false,
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
						// 保存用户名到cookie
						console.log(data['username']);
						document.cookie = 'username=' + (this.rememberUser ? encodeURIComponent(data['username']) : '') + ';path=/;expires=-1';
						// 准备数据
						let arr = [];
						for (let key in data) {
							if (key === 'password') {
								arr.push(encodeURIComponent(key) + '=' + md5(encodeURIComponent(data[key])));
							} else {
								arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
							}
						}
						// 执行登陆请求操作
						this.$http.post('/Estore/servlet/LoginServlet', arr.join('&'), {
							'headers': {
								'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
							}
						}).then(res => {
							var resData = eval('(' + res.bodyText + ')');
							console.log(resData);
							if (resData.result == 'succ') {
								// 弹出消息提醒登陆成功
								this.$message({
									message: '恭喜你，登陆成功！',
									type: 'success'
								});
								// 跳转到欢迎页
								this.$router.push('welcome');
							} else {
								console.log(resData.code);
								switch (resData.code) {
									case '101':
										this.$message.error('登陆失败：用户名或密码不正确！');
										break;
									case '102':
										this.$message.error('登陆失败：用户名不存在！');
										break;
									case '103':
										this.$message.error('登陆失败：用户未激活，请打开激活链接进行激活后再登陆！');
										break;
									default:
										break;
								}
							}
						}, err => {
							// 弹出消息提醒登陆失败
							this.$message.error('登陆失败：请稍后再试！');
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
		},
		created() {
			// 读取cookie，解析username
			if (document.cookie.length > 0) {
				let c = document.cookie.split(';');
				for (let i = 0; i < c.length; i++) {
					let arr = c[i].split('=');
					if (arr[0] === 'username' && arr[1] !== '') {
						this.ruleForm.username = decodeURIComponent(arr[1]);
						this.rememberUser = true;
						return;
					}
				}
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
