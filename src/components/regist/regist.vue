<template>
	<div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="ruleForm.username"></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" v-model="ruleForm.password"></el-input>
			</el-form-item>
			<el-form-item label="确认密码" prop="password2">
				<el-input type="password" v-model="ruleForm.password2"></el-input>
			</el-form-item>
			<el-form-item label="昵称" prop="nickname">
				<el-input v-model="ruleForm.nickname"></el-input>
			</el-form-item>
			<el-form-item label="邮箱" prop="email">
				<el-input v-model="ruleForm.email"></el-input>
			</el-form-item>
			<el-form-item label="验证码" prop="validateStr">
				<el-input v-model="ruleForm.validateStr"></el-input>
			</el-form-item>
			<el-form-item>
				<img class="validateImg" :src="url" @click="changeImg()"></img>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
				<el-button @click="resetForm('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
	import md5 from 'js-md5';
	
	export default {
		data () {
			return {
				url: '/Estore/servlet/ValidateImgServlet',
				ruleForm: {
					username: '',
					password: '',
					password2: '',
					nickname: '',
					email: '',
					validateStr: ''
				},
				rules: {
					username: [
						{
							validator: (rule, value, callback) => {
								if (value === '') {
									callback(new Error('用户名不能为空！'));
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
									callback(new Error('密码名不能为空！'));
								} else {
									callback();
								}
							},
							trigger: 'blur',
							required: true
						}
					],
					password2: [
						{
							validator: (rule, value, callback) => {
								if (value === '') {
									callback(new Error('请再次输入密码！'));
								} else if (value !== this.ruleForm.password) {
									callback(new Error('两次密码不一致！'));
								} else {
									callback();
								}
							},
							trigger: 'blur',
							required: true
						}
					],
					nickname: [
						{
							validator: (rule, value, callback) => {
								if (value === '') {
									callback(new Error('昵称不能为空！'));
								} else {
									callback();
								}
							},
							trigger: 'blur',
							required: true
						}
					],
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
					],
					validateStr: [
						{
							validator: (rule, value, callback) => {
								if (value === '') {
									callback(new Error('请输入验证码！'));
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
			submitForm(formName) {
				let data = this.ruleForm;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						console.log('表单校验成功！');
						// 准备数据
						let arr = [];
						for (let key in data) {
							if (key === 'password') {
								arr.push(encodeURIComponent(key) + '=' + md5(encodeURIComponent(data[key])));
							} else {
								arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
							}
						}
						// 向服务器提交注册
						this.$http.post('/Estore/servlet/RegistServlet', arr.join('&'), {
							'headers': {
								'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
							}
						}).then(res => {
							this.$message({
								message: '恭喜你，注册成功！',
								type: 'success'
							});
							// 跳转到主页
							this.$router.push("welcome");
						}, err => {
							this.$message.error('注册失败，请稍后重试！');
						});
					} else {
						console.log('表单校验失败！');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			changeImg() {
				this.url = '/Estore/servlet/ValidateImgServlet?time=' + new Date().getTime()
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.validateImg {
		cursor pointer
	}
</style>
