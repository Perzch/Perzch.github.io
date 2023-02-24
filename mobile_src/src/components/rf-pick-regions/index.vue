<template>
	<!--	<picker mode="multiSelector"-->
	<!--	        :value="multiIndex"-->
	<!--	        :range="multiArray"-->
	<!--	        @change="handleValueChange"-->
	<!--	        @columnchange="handleColumnChange">-->
	<!--		<slot></slot>-->
	<!--	</picker>-->
	<picker
		mode="multiSelector"
		@columnchange="bindMultiPickerColumnChange"
		:value="multiIndex"
		range-key="name"
		:range="multiArray"
	>
		{{ multiStr }}
	</picker>
</template>

<script>
	import {
		getAddressList
	} from "@/api/address.js"
/* eslint-disable */
export default {

	props: {
		// defaultRegions: {
		//     type: Array,
		// }
		defaultLevel: {
			type: Number,
			default: 3
		},
		addressData: {
			type: Object,
			default() {
				return {};
			}
		},
		pca: {
			type: String,
			default:""
		}
	},
	data() {
		return {
			multiArray: [],
			multiIndex: [0, 0, 0],
			multiStr: ''
		};
	},
	mounted() {
	  // this.$mHelper.log(this.addressData);
		this.getProvinceList();
	},
	methods: {
		async getProvinceList() {
			let provinceIndex = 0;
			let cityIndex = 0;
			let areaIndex = 0;
			let province_name = null;
			let city_name = null;
			let area_name = null;
			
			getAddressList().then(r=>{
				this.multiArray[0] = r.data;
				if (this.addressData.province) {
					r.data.forEach((item, index) => {
						if (item.name == this.addressData.province) {
							provinceIndex = index;
							this.addressData.province_id = item.city_id;
							province_name = item.name;
							this.addressData.province_name = item.name;
						}
					});
				} else {
					this.addressData.province_id = this.multiArray[0][0].city_id;
					province_name = this.multiArray[0][0].name;
					this.addressData.province_name = this.multiArray[0][0].name;
				}
				await this.$get(this.api.API_GET_CITY_LIST+'/'+this.addressData.province_id)
					.then(async r => {
						this.multiArray[1] = r.data;
						if (this.addressData.city) {
							r.data.forEach((item, index) => {
								if (item.name == this.addressData.city) {
									cityIndex = index;
									this.addressData.city_id = item.city_id;
									city_name = item.name;
									this.addressData.city_name = item.name;
								}
							});
						} else {
							this.addressData.city_id = this.multiArray[1][0].city_id;
							city_name = this.multiArray[1][0].name;
							this.addressData.city_name = this.multiArray[1][0].name;
						}
						await this.$get(this.api.API_GET_CITY_LIST+'/'+this.addressData.city_id)
							.then(r => {
								this.multiArray[2] = r.data;
								if (this.addressData.district) {
									r.data.forEach((item, index) => {
										if (item.name == this.addressData.district) {
											areaIndex = index;
											this.addressData.area_id = item.city_id;
											area_name = item.name;
											this.addressData.area_name = item.name;
										}
									});
								} else {
									this.addressData.area_id = this.multiArray[2][0].city_id;
									area_name = this.multiArray[2][0].name;
									this.addressData.area_name = this.multiArray[2][0].name;
								}
								this.multiIndex = [provinceIndex, cityIndex, areaIndex];
								this.multiStr = `${province_name}, ${city_name}, ${area_name}`;
								this.$emit('getRegions', this.addressData);
							});
					});
					
			});
		},
		async bindMultiPickerColumnChange(e) {
			this.multiIndex[e.detail.column] = e.detail.value;
			let provinceIndex = 0;
			let cityIndex = 0;
			let areaIndex = 0;
			let province_name = null;
			let city_name = null;
			let area_name = null;
			switch (e.detail.column) {
				case 0: //拖动第1列
					if (this.multiIndex[0] === this.multiIndex[0]) {
            this.addressData.province_id = this.multiArray[0][
	            e.detail.value
            ].city_id;
            province_name = this.multiArray[0][e.detail.value].name;
			this.addressData.province_name = this.multiArray[0][e.detail.value].name;
            await this.$get(this.api.API_GET_CITY_LIST+'/'+this.multiArray[0][e.detail.value].city_id)
	            .then(async r => {
		            this.multiArray[1] = r.data;
		            this.addressData.city_id = this.multiArray[1][0].city_id;
		            city_name = this.multiArray[1][0].name;
					this.addressData.city_name = this.multiArray[1][0].name;
		            provinceIndex = e.detail.value;
		            await this.$get(this.api.API_GET_CITY_LIST+'/'+this.multiArray[1][e.detail.column].city_id)
			            .then(r => {
				            this.multiArray[2] = r.data;
				            this.addressData.area_id = this.multiArray[2][0].city_id;
				            area_name = this.multiArray[2][0].name;
							this.addressData.area_name = this.multiArray[2][0].name;
				            this.multiIndex = [provinceIndex, 0, 0];
				            this.multiStr = `${province_name}, ${city_name}, ${area_name}`;
			            });
	            });
          }
					break;
				case 1: //拖动第2列
					if (this.multiIndex[0] === this.multiIndex[0]) {
            if (this.multiIndex[1] === this.multiIndex[1]) {
              this.addressData.province_id = this.multiArray[0][
	              this.multiIndex[0]
              ].city_id;
              province_name = this.multiArray[0][this.multiIndex[0]].name;
			  this.addressData.province_name = this.multiArray[0][this.multiIndex[0]].name;
              this.addressData.city_id = this.multiArray[1][
	              e.detail.value
              ].city_id;
              city_name = this.multiArray[1][e.detail.value].name;
			  this.addressData.city_name = this.multiArray[1][e.detail.value].name;
              cityIndex = e.detail.value;
              await this.$get(this.api.API_GET_CITY_LIST+'/'+this.multiArray[1][e.detail.value].city_id)
	              .then(r => {
		              this.multiArray[2] = r.data;
		              this.addressData.area_id = this.multiArray[2][0].city_id;
		              area_name = this.multiArray[2][0].name;
					  this.addressData.area_name = this.multiArray[2][0].name;
		              this.multiIndex = [this.multiIndex[0], cityIndex, 0];
		              this.multiStr = `${province_name}, ${city_name}, ${area_name}`;
	              });
            }
          }
					break;
				case 2: //拖动第3列
					if (this.multiIndex[0] === this.multiIndex[0]) {
            if (this.multiIndex[1] === this.multiIndex[1]) {
              if (this.multiIndex[2] === this.multiIndex[2]) {
                this.addressData.province_id = this.multiArray[0][
	                this.multiIndex[0]
                ].city_id;
                province_name = this.multiArray[0][this.multiIndex[0]].name;
				this.addressData.province_name = this.multiArray[0][this.multiIndex[0]].name;
                this.addressData.city_id = this.multiArray[1][this.multiIndex[1]].id;
                city_name = this.multiArray[1][this.multiIndex[1]].name;
				this.addressData.city_name = this.multiArray[1][this.multiIndex[1]].name;
                this.addressData.area_id = this.multiArray[2][
	                e.detail.value
                ].city_id;
                area_name = this.multiArray[2][e.detail.value].name;
				this.addressData.area_name = this.multiArray[2][e.detail.value].name;
                areaIndex = e.detail.value;
                this.multiIndex = [
	                this.multiIndex[0],
	                this.multiIndex[1],
	                areaIndex
                ];
                this.multiStr = `${province_name}, ${city_name}, ${area_name}`;
              }
            }
          }
					break;
			}
			this.$emit('getRegions', this.addressData);
		}
	}
};
</script>
