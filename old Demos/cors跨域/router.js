//假设域名是localhost, 端口是8080
//更多详细使用方法参考 http://www.expressjs.com.cn/guide/routing.html

/**
 * 当 http://localhost:8080/getInfo 的GET请求到来时被下面匹配到进行处理
**/
app.get('/loadMore',function(req,res){
	var idx = req.query.index
	var len = req.query.length 
	var data = []
	for(var i = 0; i<len ; i++){
		data.push('内容' + (parseInt(idx)+i+1));
	}
	res.header('Access-Control-Allow-Origin','*');
	res.send(data);
	
}); 
 


/**
 * 当 http://localhost:8080/comment 的GET请求到来时被下面匹配到进行处理
 * 通过req.body获取post请求的参数对象 
 * 通过 req.send发送响应
 */
// app.post('/comment', function(req, res) {
//   console.log(req.body.comment); // 可通过req.body获取 post 提交的参数
//   res.send({status: 'ok'});
// });


