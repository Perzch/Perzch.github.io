<template>
	<div class="ban">

		<div class="item">
			<van-row>
				<van-col span="8" class="text">
					<span>总资产（元）</span><br />
					<span>{{ userAccount.nowMoney }}</span>
				</van-col>
				<van-col span="8" class="text">
					<span>累计充值(元)</span><br />
					<span>{{ userAccount.recharge }}</span>
				</van-col>
				<van-col span="8" class="text">
					<span>累计消费(元)</span><br />
					<span>{{ userAccount.orderStatusSum }}</span>
				</van-col>
			</van-row>

		</div>
		<div class="btn">
			<div v-for="(item, index) in rechargeIndex" :key="index">
				<van-cell title="单元格" icon="shop-o" border>
					<template #title>
						<span>充值￥{{ item.value.price }} 赠送￥{{ item.value.give_price }}</span>
					</template>
					<template #right-icon>
						<van-button type="danger" v-if="!loading" loading disabled round @click="prepaid(item.id)">充值
						</van-button>
						<van-button type="danger" v-if="loading" round @click="prepaid(item.id)">充值</van-button>
					</template>
				</van-cell>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		getBalance,
		prepaid,
		prepaidPlan
	} from "@/api/wallet.js"
	export default {
		data() {
			return {
				loading: true,
				userAccount: "",
				recharge: "",
				rechargeIndex: [],
			};
		},
		created() {
			this.getBalance()
			this.prepaidPlan()
		},
		methods: {
			//充值计划
			prepaidPlan() {
				prepaidPlan().then(res => {
					this.rechargeIndex = res.data.rechargePriceWays;
				})
			},
			//我的钱包数据
			getBalance() {
				getBalance().then(res => {
					this.userAccount = res.data
				})
			},
			//充值
			prepaid(id) {
				this.loading = false
				prepaid({
					rechar_id: id,
				}).then(res => {
					if (res.status == 200) {
						this.$toast.success("充值成功")
						this.getBalance()
						this.prepaidPlan()
						let vm = this
						setTimeout(function() {
							vm.loading = true
						}, 800)

					}

				})
			},
		}
	}
</script>
<style scoped>
	.item {
		background: #000000;
		width: 100%;
		border-radius: 6px;
	}

	.ban {
		width: calc(100% - 20px);
		margin: 10px auto;

	}

	.btn {
		background-color: #f0f0f0;
		width: 100%;
		margin-top: 15px;
		border-radius: 6px;
	}

	.btn button {
		height: 24px;
	}

	.lab {
		padding: 6px;
		line-height: 22px;
		font-size: 12px;
		color: #676767;
	}

	.text {
		text-align: center;
		line-height: 30px;
		font-size: 12px;
		color: #F0AD4E;
	}
</style>
