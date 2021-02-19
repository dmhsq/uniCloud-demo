'use strict';

function getTQ(city) {
	let res = uniCloud.httpclient.request("https://tianqiapi.com/api?version=v6&appid=xxxxx&appsecret=xxxxx&city=" +
		city)
	return new Promise(function(resolve) {
		res.then(ress => {
			let arrayBuffer = ress.res.data
			let unit8Arr = new Uint8Array(arrayBuffer)
			let encodedString = String.fromCharCode.apply(null, unit8Arr)
			let decodedString = decodeURIComponent(escape(encodedString))
			let data = JSON.parse(decodedString)
			resolve(data)
		})
	})
}

function getQH(city) {
	let res = uniCloud.httpclient.request('http://shiyan666.cn/api/twqh.php')
	return new Promise(function(resolve) {
		res.then(ress => {
			let arrayBuffer = ress.res.data
			let unit8Arr = new Uint8Array(arrayBuffer)
			let encodedString = String.fromCharCode.apply(null, unit8Arr)
			let decodedString = decodeURIComponent(escape(encodedString))
			let data = JSON.parse(JSON.stringify(decodedString))
			resolve(data)
		})
	})
}
exports.main = async (event, context) => {
	let datas = await getTQ('xxx');
	let qh = await getQH();
	try {
		const res = await uniCloud.sendSms({
			smsKey: 'xxxx',
			smsSecret: 'xxxxx',
			phone: 'xxxxxx',
			templateId: 'xxxx',
			data: {
				weekday: datas.week + ',亲爱的',
				weather: `当前温度${datas.tem}℃,最高温度${datas.tem1}℃,最低温度${datas.tem2}℃,出行建议:${datas.air_tips}\n`,
				story: ':土味情话:' + qh
			}
		})
		// 调用成功，请注意这时不代表发送成功
		return "成功"
	} catch (err) {
		// 调用失败
		console.log(err.errCode)
		console.log(err.errMsg)
		return {
			code: err.errCode,
			msg: err.errMsg
		}
	}
};
