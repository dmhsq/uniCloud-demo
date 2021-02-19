'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	let type = event.type
	const dbs = uniCloud.database();
	let db = dbs.collection('story')
	if(type==1){
		let res = await db.get()
		return res
	}else if(type==2){
		let qh = await db.where({xid: event.xid}).get()
		let id = qh.data[0]._id
		let ipdb = await db.doc(id).update({
		  story: event.story
		});
		return ipdb
	}else{
		return "error"
	}
	
	
	
};
