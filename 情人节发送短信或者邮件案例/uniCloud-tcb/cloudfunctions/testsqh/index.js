'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const dbs = uniCloud.database();
	let db = dbs.collection('story')
	let now = new Date();
	let day = now.getDay();
	let qh = await db.where({xid: day}).get()
	console.log(qh.data[0].story)
	let dbtx = dbs.collection('tx')
	let res = await dbtx.get()
	let tx = res.data[0].tx
	let id = res.data[0]._id
	if(tx==7){
		tx = 0;
		let ipdb = await dbtx.doc(id).update({
		  tx: tx
		});
		try {
			const res = await uniCloud.sendSms({
				smsKey: 'xxxxxxxx',
				smsSecret: 'xxxxxxxxxx',
				phone: 'yourphone',
				templateId: 'xxxxx',
				data: {
					weekday: '用完啦',
					weather: '用完啦',
					story: '用完啦'
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
	}
	else{
		tx = tx+1;
		let ipdb = await dbtx.doc(id).update({
		  tx: tx
		});
	}
	
	
	
	return 1
};
