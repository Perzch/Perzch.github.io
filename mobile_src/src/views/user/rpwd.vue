<template>
	<div class="wrapper">
		<van-field v-model="pwd" type="password" label="原始密码:" placeholder="请输入" />
		<van-field v-model="newpwd" type="password" label="新密码:" placeholder="请输入" />
		<van-field v-model="rpwd" type="password" label="重复密码:" placeholder="请输入" />
		<van-button block class="btn" color="#fe5e48" @click="confirm()">确定</van-button>
	</div>
</template>

<script>
	import {
		forget,
		loginOut
	} from "@/api/login.js"
	import Cookies from 'js-cookie'
	export default {
		data() {
			return {
				pwd: "",
				newpwd: "",
				rpwd: "",
			};
		},

		methods: {

			//提交
			confirm() {
				if (!this.pwd || !this.newpwd || !this.rpwd) {
					this.$toast("请输入完整信息");
					return;
				}
				if (this.newpwd.length < 6 || this.rpwd.length < 6) {
					this.$toast("新密码必须6位以上");
					return;
				}
				if (this.newpwd != this.rpwd) {
					this.$toast("重复密码与新密码不一致");
					return;
				}
				forget({
					password: this.pwd,
					newPassword: this.newpwd,
				}).then((res) => {
					if (res.status == 200) {
						this.$toast("密码修改成功，请重新登录")
						Cookies.set("Token", "", -1)
						sessionStorage.clear();
						loginOut();
						this.$router.push("/login")
					} else {
						this.$toast(res.msg);
					}
				});
			},
		},
	};
</script>

<style scoped>
	.btn {

		width: calc(100% - 30px);
		margin: 20px auto;
		border-radius: 12px;
	}

	.wrapper {
		margin-top: 15px;
	}
</style>
