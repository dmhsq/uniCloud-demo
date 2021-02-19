<template>
	<view class="content">
		<view v-for="item in tableList" style="border: #DD524D solid 1px;">
			<view class="text-area">{{item.xid}}</view>
			<textarea v-model="item.story"></textarea>
			<button type="primary" @click="upstory(item.xid,item.story)">修改</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tableList: [],
				butable: []
			}
		},
		onLoad() {
			this.getDB();
		},
		methods: {
			getDB() {
				let vm = this;
				uniCloud.callFunction({
					name: 'getdbs',
					data: {
						type: 1
					},
					success: function(res) {
						console.log(res.result.data)
						vm.tableList = res.result.data
						vm.butable = JSON.parse(JSON.stringify(vm.tableList))
					}
				})
			},
			upstory(xid, story) {
				let vm = this;
				if(this.butable[xid-1].story==story){
					uni.showToast({
						icon: 'none',
						title: '没有任何变化'
					})
					return 
				}
				uniCloud.callFunction({
					name: 'getdbs',
					data: {
						type: 2,
						xid: xid,
						story: story
					},
					success: function(res) {
						if (res.result.updated == 0) {
							uni.showToast({
								icon: 'none',
								title: '更新失败'
							})
						}
						if(res.result.updated == 1) {
							uni.showToast({
								icon: 'none',
								title: '更新成功'
							})
							vm.butable = JSON.parse(JSON.stringify(vm.tableList))
						}
					}
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}
</style>
