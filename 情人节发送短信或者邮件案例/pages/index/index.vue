<template>
	<view class="content">
		<image class="logo" :src="srcs" @click="tests()"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				presents: 0,
				srcs: '/static/logo.png'
			}
		},
		onLoad() {
			uni.navigateTo({
				url:'../qh/qh'
			})
		},
		methods: {
			tests() {
				uniCloud.chooseAndUploadFile({
					type: 'image',
					success:function(res){
						console.log(res)
					}
				})
			},
			test() {
				let vm = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'], //指定压缩图
					success: function(res) {
						let path = res.tempFilePaths[0]
						uniCloud.uploadFile({
							filePath: path,
							cloudPath: 'dmhsq.jpg',
							onUploadProgress: function(progressEvent) {
								vm.presents = Math.round(
									(progressEvent.loaded * 100) / progressEvent.total
								);
							},
							success: function(res) {
								let purl = res.fileID;
								uni.showToast({
									icon: 'none',
									title: '上传成功',
									duration: 1500
								})
								uniCloud.getTempFileURL({
									fileList: [purl],
									success: function(res) {
										vm.srcs = res.fileList[0].tempFileURL
									}
								})
							}
						});
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

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
