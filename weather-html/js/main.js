
var getWeather = (function(){
  function weather(){
    this.getIp()
    this.getCity()
    this.getWea()
    this.render()
  }
  weather.prototype = {
    getIp : function(){
      $.ajax({
        type:'get',
        data:'',
        url:'https://weixin.jirengu.com/weather/ip',
        success:function(data){
          var ip = data['data']
          console.log(ip)
          $.ajax({
            type:'get',
            url:'https://weixin.jirengu.com/weather/cityid?',
            data: 'location='+ip,
            success:function(data){             
              this.city = data.results[0].name
              this.cityId = data.results[0].id  
              $('.city').html(this.city + '市')
              $.ajax({
                type:'get',
                url:'https://weixin.jirengu.com/weather/now?',
                data:'cityid=' + this.cityId,
                success:function(data){
                  console.log(data.weather[0])
                  var arr = data.weather[0]
                  $('#today-wea').html(arr.now.text)
                  $('#today-tem').html(arr.now.temperature)
                  $('#wea-img').attr('src','https://weixin.jirengu.com/images/weather/code/'+arr.now.code+'.png')
                  
                },
                error:function(){
                  alert('天气生成失败')
                }
              })                                       
             },
            error:function(){
                console.log('城市获取失败')
            }
            
          })
        }
      }).done(function(){})
      
    },
    getCity : function(){
     
    },
    render : function(){
      // $('.city').html(city)
      // console.log(this.city)
    },
    getWea : function(){}
  }
  return function(){
    new weather()
  }
})()
var getTime = (function(){
  function renderTime(){
    this.init()
    this.render()
  }
  renderTime.prototype = {
    init : function(){
      var now = this.now = new Date()
      this.month = now.getMonth(now)+1
      this.date = now.getDate(now)
      this.day = now.getDay(now)
    },
    bind : function(){
      this.chi  = ['日','一','二','三','四','五','六']
      this.chiDay  = this.chi[this.day]
    },
    render : function(){
      this.bind()
      $('#date').html(this.month+'月' + this.date +'日')
      $('#day').html('星期' + this.chiDay)
    }
  }
  return function(){
    new renderTime()
  }
})()




$(document).ready(function(){
  getTime()
  getWeather()
})

