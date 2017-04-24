app.get('/loadMore',function(req,res){
	var idx = req.query.index
	var len = req.query.length 
	var data = []
	for(var i = 0; i<len ; i++){
		data.push('内容' + (parseInt(idx)+i+1));
	}
    var cb = req.query.callback    //传来的函数名字

	res.send(cb + '(' +JSON.stringify(data) +')');    //将data转换成json格式的字符串
}); 