define(['jquery'],function(require){
    function carousel(){
        this.init()
        this.bind()
        this.autoPlay()
        this.navPlay()
      }
      
      carousel.prototype.init = function(){
        this.$imgCt = $('.img-ct')
        this.$imgs = $('.img-box')
        this.$leftBtn = $('.btn-left')
        this.$rightBtn = $('.btn-right')
        this.$nav = $('.nav')
        this.isAnimate = false
        this.imgPage = 0
        this.imgLength = this.$imgCt.children().length -2
        this.imgWidth = this.$imgs.width()
        this.$imgCt.width(this.$imgCt.find('li').eq(0).width() * this.$imgCt.children().length)
      }
      carousel.prototype.bind = function(){
        var _this = this
        this.$leftBtn.on('click',function(){
           _this.playPre()
         
        })
        this.$rightBtn.on('click', function() {
           _this.playNext()
       
        })
      }
      carousel.prototype.playPre = function(){
        var _this = this 
        if(this.isAnimate){
          return
        }
        this.isAnimate = true 
        this.$imgCt.animate({
          'left': "+="+this.imgWidth,
        }, 500,function(){    
          
          _this.imgPage --
          console.log(_this.imgPage)
         if(_this.imgPage <0){
           _this.$imgCt.css('left','-'+_this.imgWidth*4+'px')
           _this.imgPage = 3    
        }
           _this.navActive()
           _this.isAnimate = false 
           _this.stopAuto()
           _this.autoPlay()//重置自动翻页时间  
        })         
      }
      carousel.prototype.playNext = function(){
        
        var _this = this
        if(this.isAnimate){
           return 
        } 
        this.isAnimate = true      
        this.$imgCt.animate({
          'left': "-="+this.imgWidth
        }, 500,function(){
            
          _this.imgPage ++
         if(_this.imgPage===_this.imgLength){
           _this.$imgCt.css({'left':'-'+_this.imgWidth+'px'})
           _this.imgPage = 0
        }
          _this.isAnimate = false
          _this.navActive()
          _this.stopAuto()
          _this.autoPlay()//重置自动翻页时间          
        })  
      }
       carousel.prototype.autoPlay = function(){
         var _this = this
        clock = setInterval(function(){
          _this.playNext()},3000)
      }    
      carousel.prototype.stopAuto = function(){
          clearInterval(clock)
      }
      carousel.prototype.navPlay = function(){
        var _this = this
        $('.nav li').on('click',function(){
        var index = $(this).index()
        _this.$imgCt.animate({
          left: -(index*_this.imgWidth+_this.imgWidth)
          
        },666,'linear',function(){
          _this.imgPage = index
          _this.navActive()
        })
      })
      carousel.prototype.navActive = function(){
        this.$nav.find('.active').removeClass('active')
        this.$nav.children().eq(this.imgPage).addClass('active')
      }
      }
      new carousel()
})