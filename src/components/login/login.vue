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
				this.$refs[fromName].validate((value) => {
					if (value) {
						console.log('表单校验成功！');
						// 执行登陆请求操作
					} else {
						console.log('表单校验失败！');
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
