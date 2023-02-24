<template>
	<div class="warpper">
		<template>
			<van-cell is-link @click="addressShow=true" v-if="!addressInfo">
				<template #title>
					<span class="custom-title">请选择地址 </span>
				</template>
			</van-cell>
			<van-cell is-link @click="addressShow=true" v-if="addressInfo">
				<template #title>
					<span class="custom-title">{{addressInfo.realName}}</span>
					<span class="custom-title" style="margin-left: 8px;">{{addressInfo.phone}}</span>
				</template>
				<template #label>
					<span
						class="custom-title">{{addressInfo.province+' '+addressInfo.district+' '+addressInfo.city}}</span>
				</template>
			</van-cell>
			
			<van-popup v-model="addressShow" round position="bottom" :style="{ height: '40%' }">
				<van-contact-card type="add" @click="onAdd" />
				<template v-for="item in addressList">
					<van-contact-card type="edit" :name="item.realName" :tel="item.phone" @click="address(item)" />
				</template>
			</van-popup>
			<!-- 商品信息 -->
			<template v-for="(item,index) in cartInfo" v-if="cartInfo.length>0">
				<van-card :num="item.cartNum" :desc="item.productInfo.storeInfo" :title="item.productInfo.storeName"
					style="background-color: #fff;" :thumb="imgUrls+item.productInfo.image">
					<template #price>
						<span v-if="item.productInfo.isIntegral==1">
							<font size="4" color="#ED6A0C">{{item.productInfo.attrInfo.integral}}</font>
							<font size="3" color="#ED6A0C">积分</font>
						</span>
						<span v-else>
							<font size="3" color="#ED6A0C">￥</font>
							<font size="4" color="#ED6A0C">{{item.truePrice}}</font>
						</span>
					</template>
					<template #tags>
						<van-tag plain type="danger">{{item.productInfo.attrInfo.sku}}</van-tag>

					</template>
				</van-card>
			</template>
			<!-- 商品信息end -->
			<!-- 优惠券列表 -->
			<!-- 		<van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true" /> -->
			<van-cell title="优惠券" is-link @click="showList = true" v-if="!enableIntegral">
				<template #default v-if="couponInfo">
					<span>
						<font size="2" color="#cccccc">已减{{couponInfo.couponPrice}}</font>
					</span>
				</template>
			</van-cell>
			<van-popup v-model="showList" round position="bottom" :style="{ height: '30%', background:'#f5f5f5'}">
				<van-cell center class="discount" @click="" v-for="(item,index) in couponList" :key="index"
					@click="ckCoupon(item)">
					<!-- 使用 title 插槽来自定义标题 -->
					<template #title>
						<span style="margin-left: 10px;">{{item.couponTitle}}</span><br />
						<span style="margin-left: 10px;">
							<font size="2" color="#cccccc">满{{item.useMinPrice}}减{{item.couponPrice}}</font>
						</span>
					</template>
					<template #label>
						<font style="margin-left: 10px;" size="3" color="#ff5a5f">{{item.endTime}} 到期</font>
					</template>
					<template #icon>
						<font size="2" color="#ff5a5f">￥</font>
						<font size="6" color="#ff5a5f">{{item.couponPrice}}</font>
					</template>
				</van-cell>

			</van-popup>
			<!-- <van-popup v-model="showList" round position="bottom" style="height: 90%; padding-top: 4px;">
			<van-coupon-list :coupons="coupons" :chosen-coupon="chosenCoupon" :disabled-coupons="disabledCoupons"
				@change="onChange" @exchange="onExchange" />
		</van-popup> -->
			<!-- 优惠券列表end -->
			<template v-if="priceInfo.result">
				<van-cell title="商品价格" :value="priceInfo.result.totalPrice" v-if="!enableIntegral" />
				<van-cell title="商品价格" :value="priceInfo.result.payIntegral+'积分'" v-if="enableIntegral" />
				<van-cell title="优惠" :value="priceInfo.result.couponPrice" v-if="!enableIntegral" />
				<van-cell title="运费" :value="priceInfo.result.payPostage>0 ? priceInfo.result.payPostage : '免邮费'" />
				<van-field v-model="mark" label="备注" placeholder="请输入备注" />
				</van-cell>
			</template>
			<!-- 支付方式 -->
			<div class="pay" v-if="!enableIntegral">
				<van-radio-group v-model="radio">
					<van-cell center icon="shop-o">
						<!-- 使用 right-icon 插槽来自定义右侧图标 -->
						<template #title>
							<span class="custom-title">余额</span>
						</template>
						<template #label>
							<span class="custom-title">￥{{userInfo.nowMoney}}</span>
						</template>
						<template #right-icon>
							<van-radio name="1"></van-radio>
						</template>
					</van-cell>
					<van-cell center icon="shop-o">
						<!-- 使用 right-icon 插槽来自定义右侧图标 -->
						<template #title>
							<span class="custom-title">微信</span>
						</template>
						<template #label>
							<span class="custom-title">暂未开通</span>
						</template>
						<template #right-icon>
							<van-radio name="1" disabled></van-radio>
						</template>
					</van-cell>
				</van-radio-group>
			</div>
			<div v-else class="pay">
				<van-radio-group v-model="radio">
					<van-cell center icon="shop-o">
						<!-- 使用 right-icon 插槽来自定义右侧图标 -->
						<template #title>
							<span class="custom-title">剩余积分</span>
						</template>
						<template #default>
							<span class="custom-title">{{userInfo.integral}}</span>
						</template>
						<template #right-icon>
							<van-radio name="1"></van-radio>
						</template>
					</van-cell>
				</van-radio-group>
			</div>
			<van-submit-bar v-if="priceInfo.result&&!enableIntegral" :price="priceInfo.result.payPrice*100"
				button-text="提交订单" @submit="createOrder" />
			<van-submit-bar v-if="priceInfo.result&&enableIntegral" :price="priceInfo.result.payIntegral*100"
				button-text="提交订单" @submit="createOrder" />
		</template>

	</div>
</template>

<script>
	import {
		getAddress
	} from "@/api/address.js"
	import {
		getOrderInfo,
		getOrderSum,
		createOrder
	} from "@/api/order.js"
	import {
		getOrderCoupons
	} from "@/api/discount.js"
	export default {
		data() {
			return {
				imgUrls: this.$baseApi,
				priceGroup: {}, //价格
				addressShow: false,
				radio: '1',
				mark: null,
				showList: false,
				chosenCoupon: -1,
				couponList: [], //优惠券列表
				couponInfo: {}, //优惠券
				addressInfo: null, //地址
				addressList: [], //地址列表
				orderKey: '',
				priceInfo: {},
				userInfo: {},
				cartInfo: [], //购物车列表
				loading: false,
				enableIntegral: false, //是否使用积分
			};
		},
		created() {
			if (this.$route.query.integral == 1) {
				this.enableIntegral = true
			} else {
				this.enableIntegral = false
			}

			this.getorder()
			this.getOrderCoupons()

		},
		methods: {
			//查询联系人
			getAddressList() {
				getAddress().then(res => {
					this.addressList = res.data
				})
			},
			//获取订单
			getorder() {
				getOrderInfo({
					cartId: this.$route.query.ids
				}).then(res => {
					this.cartInfo = res.data.cartInfo
					this.addressInfo = res.data.addressInfo
					if (this.addressList.length > 0) {
						this.$toast('请添加地址信息');
						let vm = this
						setTimeout(function() {
							vm.$router.push("/newContact")
						}, 1500)
					}
					this.couponInfo = res.data.usableCoupon;
					this.orderKey = res.data.orderKey
					this.userInfo = res.data.userInfo
					this.getAddressList()
					this.sumOrder()
				})
			},
			//获取订单优惠券
			getOrderCoupons() {
				getOrderCoupons(this.$route.query.ids).then(res => {
					this.couponList = res.data
				})
			},
			//选择优惠券
			ckCoupon(data) {
				this.showList = false;
				this.couponInfo = data
			},
			//计算订单金额
			sumOrder() {
				let couponId = null
				if (this.couponInfo) {
					couponId = this.couponInfo.id
				}
				if (this.addressInfo) {
					getOrderSum({
						key: this.orderKey,
						addressId: this.addressInfo.id,
						couponId: couponId,
						payType: 'yue',
						shipping_type: 1,
					}).then(res => {
						this.priceInfo = res.data
						this.loading = true
					})
				} 
			},
			//提交订单
			createOrder() {
				if (!this.addressInfo) {
					this.$toast('请添加地址信息');
					return
				}
				let couponId = null
				if (this.couponInfo) {
					couponId = this.couponInfo.id
				}
				createOrder({
					key: this.orderKey,
					addressId: this.addressInfo.id,
					couponId: couponId == null ? 0 : couponId,
					from: 'h5',
					mark: this.mark,
					useIntegral: this.enableIntegral ? 1 : 0,
					payType: this.enableIntegral ? 'integral' : 'yue', //余额
					shippingType: 1, //快递
					pinkId: 0, //拼团id 0没有拼团
				}).then(res => {
					if (res.status == 200) {
						this.$router.push('/paySuccess')
					}
				})
			},
			onAdd() {
				this.$router.push("/contactList")
			},
			//选择联系人
			address(data) {
				this.addressShow = false
				this.addressInfo = data
				this.sumOrder()
			},

		},
	}
</script>

<style scoped>
	.warpper {
		padding: 15px;
	}

	.discount {
		width: calc(100% - 15px);
		margin: 10px auto;
		border-radius: 8px;
	}

	.pay {
		margin-top: 15px;
		border: 1px solid #F8F8F8;
	}
</style>
