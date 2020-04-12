<template>
    <div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="商品名称" prop="name">
				<el-input v-model="ruleForm.name"></el-input>
			</el-form-item>
			<el-form-item label="商品单价" prop="price">
				<el-input v-model="ruleForm.price"></el-input>
			</el-form-item>
			<el-form-item label="商品种类" prop="category">
				<el-select v-model="ruleForm.category">
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="库存数量" prop="pnum">
				<el-input v-model.number="ruleForm.pnum"></el-input>
			</el-form-item>
			<el-form-item label="商品图片" prop="imgurl">
				<el-upload class="avatar-uploader"
					action="/Estore/servlet/AddProductServlet"
					ref="upload"
					:show-file-list="false"
					:before-upload="beforeAvatarUpload"
					:on-change="handleChange"
					:auto-upload="false"
					:data="ruleForm">
					<img v-if="ruleForm.imgurl" :src="ruleForm.imgurl" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
			</el-form-item>
			<el-form-item label="商品描述" prop="description">
				<el-input type="textarea" v-model="ruleForm.description"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="addProduct('ruleForm')">添加</el-button>
				<el-button @click="resetFrom('ruleForm')">重置</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
    export default {
        data () {
            return {
				options: [
					{
						value: '电子数码',
						label: '电子数码'
					},
					{
						value: '图书杂志',
						label: '图书杂志'
					},
					{
						value: '床上用品',
						label: '床上用品'
					},
					{
						value: '日用百货',
						label: '日用百货'
					},
					{
						value: '大型家电',
						label: '大型家电'
					},
					{
						value: '休闲零食',
						label: '休闲零食'
					}
				],
				ruleForm: {
					name: '',
					price: '',
					category: '',
					pnum: '',
					imgurl: '',
					description: ''
				},
				rules: {
					name: [
						{
							validator: (rule, value, callback) => {
								if (value === '') {
									callback(new Error('请输入商品名称！'));
								} else {
									callback();
								}
							},
							trigger: 'blur',
							required: true
						}
					],
					price: [
						{
							validator: (rule, value, callback) => {
								if (value === '') {
									callback(new Error('请输入商品单价！'));
									return;
								}
								if (!/^\d+\.{0,1}\d*$/.test(value)) {
									callback(new Error('商品单价必须是数字！'));
								} else {
									callback();
								}
							},
							trigger: 'blur',
							required: true
						}
					],
					category: [
						{
							validator: (rule, value, callback) => {
								if (value === '') {
									callback(new Error('请选择商品种类！'));
								} else {
									callback();
								}
							},
							trigger: 'blur',
							required: true
						}
					],
					pnum: [
						{
							validator: (rule, value, callback) => {
								if (value === '') {
									callback(new Error('请输入库存数量！'));
								} else if (parseInt(value) < 0) {
									callback(new Error('库存数量不能是负数！'));
								} else {
									callback();
								}
							},
							trigger: 'blur',
							required: true
						}
					],
					imgurl: [
						{
							required: true
						}
					],
					description: [
						{
							validator: (rule, value, callback) => {
								if (value === '') {
									callback(new Error('请输入商品描述！'));
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
            handleChange(file, fileList) {
				this.ruleForm.imgurl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isLt2M) {
					this.$message.error('商品图片大小不能超过 2MB!');
				}
				return isLt2M;
			},
			addProduct(fromName) {
				this.$refs[fromName].validate(valid => {
					if (valid) {
						this.$refs.upload.submit();
						this.$message({
							message: '添加成功！',
							type: 'success'
						});
						this.$router.push("welcome");
					} else {
						return false;
					}
				});
			},
			resetFrom(fromName) {
				this.$refs[fromName].resetFields();
				this.ruleForm.imgurl = '';
			}
        }
    } 
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.avatar-uploader
		.el-upload
			border: 1px dashed #d9d9d9;
			border-radius: 6px;
			cursor: pointer;
			overflow: hidden;
		.el-upload:hover
			border-color: #409EFF;
		.avatar-uploader-icon
			font-size: 28px;
			color: #8c939d;
			width: 100px;
			height: 100px;
			line-height: 100px;
			text-align: center;
		.avatar
			width: 100px;
			height: 100px;
			display: block;
</style>
