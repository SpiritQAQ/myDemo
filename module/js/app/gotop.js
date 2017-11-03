define(['jquery'],function(require){
    // var $ = require('jquery')

    function goTop(){        
        this.init()
        this.bind()
    }
    goTop.prototype = {
        init:function(){
            this.btn = $("<div id='gotop' style='position:fixed;right:30px;bottom:20px;'>回到顶部</div>") 
            $('body').append(this.btn)
            this.btn.hide()
            // this.bind()             
        },
        bind:function(){
            var _this = this
            $(window).on('scroll',function(){               
               // console.log(_this.btn)
                if($(window).scrollTop()>800){
                    _this.btn.show()                    
                }
                if($(window).scrollTop()<800){
                    _this.btn.hide()
                }
            })
            this.btn.on('click',function(){
                $(window).scrollTop(0)
            })
        }
    }
    new goTop()
})    
