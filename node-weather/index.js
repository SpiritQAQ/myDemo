#!/usr/bin/env node
var express = require('express')
var http = require('http')
var app = express()
var str = ''

var option = {
    hostname : 'weixin.jirengu.com',
    path : '/weather/now?cityid=WWWV6YM1F4ZV',
    method : 'get'
}
// var req  = http.request('http://weixin.jirengu.com/weather/now?cityid=WWWV6YM1F4ZV',function(res){
//     console.log(req.status)
//     res.setEncoding('utf8')
// })
// http.get("http://weixin.jirengu.com/weather/now?cityid=WWWV6YM1F4ZV",data).then(function(res) { 
//     console.log(res.data); 
//     }).on('error', function(e) { 
//     console.log("Got error: " + e.message); 
//     });
// http.get('http://weixin.jirengu.com/weather/now?cityid=WWWV6YM1F4ZV',function(req,res){
//     let cityid = req.cityid
//     console.log(cityid)
//     console.log(res)
// })
// console.log('weather')
http.get('http://weixin.jirengu.com/weather/now?cityid=WWWV6YM1F4ZV', (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];
  
    let error;
    if (statusCode !== 200) {
      error = new Error('请求失败。\n' +
                        `状态码: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error('无效的 content-type.\n' +
                        `期望 application/json 但获取的是 ${contentType}`);
    }
    if (error) {
      console.error(error.message);
      // 消耗响应数据以释放内存
      res.resume();
      return;
    }
  
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        console.log('地点：' + parsedData.weather[0].city_name)
        console.log('天气状况：' + parsedData.weather[0].now.text)
        console.log('实时温度：' + parsedData.weather[0].now.temperature + '℃')
        console.log(parsedData.weather[0].today.suggestion.dressing.details)
        // console.log(parsedData.weather[0].today);
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`错误: ${e.message}`);
  });
