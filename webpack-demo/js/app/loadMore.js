//var $ = require('jquery')
var $ = require('../lib/jquery-3.2.1.min')

var loadMore = function(){ 
    var pageIndex = 0
    var isOver = false
    var isDataArrived = true
    $('.loadmore').on('click',function(){
        $.get('/getItems',{page:pageIndex}).done(function(ret){
            if(ret.status === 0){
                isDataArrived = true
                appendHtml(ret)
                pageIndex+=1
                console.log('1')
            }else{
                alert('cant')
            }
        }).fail(function(){
            alert('error!')
        })
    })
    function appendHtml(ret){
        if(ret.data.length === 0){
            isOver = true
            alert('Nothing more')
            $('.loadmore').hide()
            return 
        }
        var html = ''
        $.each(ret.data,function(){
            html += '<div class="portfolio-box">'
            html += '<div class="portfolio-photo portfolio-photo'+this.number+'"><a href="#">+</a></div>'
            html += '<h3>'+this.title+'</h3>'
            html += '<p>Website Design</p></div>'

        })
        $('.portfolio-container').append(html)
    }
  }
  module.exports = loadMore()

