'use strict';

function getTQ(city) {
	let res = uniCloud.httpclient.request("https://tianqiapi.com/api?version=v6&appid=xxxxxx&appsecret=xxxxxx&city=" +
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

exports.main = async (event, context) => {
	let datas = await getTQ('xxxxx');
	try {
		const res = await uniCloud.sendSms({
			smsKey: 'xxxxxx',
			smsSecret: 'xxxxxx',
			phone: 'xxxxxxx',
			templateId: 'xxxxxxx',
			data: {
				weekday: datas.week + ',晚安亲爱的\n',
				weather: `当前温度${datas.tem}℃,最高温度${datas.tem1}℃,最低温度${datas.tem2}℃，注意增减衣物哦\n`,
				story: ':晚安老婆之我爱你'
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
