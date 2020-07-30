let slideStatus = false
;(function () {
  let fadeFlag = true

  function Fade(selector) {
    this.elem =
      typeof selector == 'Object' ? selector : document.getElementById(selector)
  }
  Fade.prototype = {
    constructor: Fade,
    setOpacity: (elem, opacity) => {
      // 兼容ie10—
      elem.filters
        ? (elem.style.filter = 'alpha(opacity = ' + opacity + ')')
        : (elem.style.opacity = opacity / 100)
      return true
    },
    setOpacity: function (num) {
      this.elem.style.opacity !== undefined
        ? (this.elem.style.opacity = num / 100)
        : (this.elem.style.filter = 'alpha(opacity = ' + num + ')')
    },
    fadeIn: function (speed, opacity) {
      /*
	    speed ==>淡入的速度，正整数（可选）;
	    opacity ==>淡入到指定的透明度，0～100（可选）;
            */
      speed = speed || 2
      opacity = opacity || 100

      let num = 0 // 初始化透明度变化值为0
      if (fadeFlag) {
        let time = setInterval(() => {
          num += speed
          fadeFlag = false
          this.setOpacity(num)
          this.elem.style.opacity !== undefined
            ? (this.elem.style.opacity = num / 100)
            : (this.elem.style.filter = 'alpha(opacity = ' + num + ')')
          if (num >= opacity) {
            clearInterval(time)
            fadeFlag = true
          }
        }, 20)
      }
    },
    fadeOut: function (speed, opacity) {
      /*
	    speed ==>淡入的速度，正整数（可选）;
	    opacity ==>淡入到指定的透明度，0～100（可选）;
	    */
      speed = speed || 2
      opacity = opacity || 0

      let num = 100 // 初始化透明度变化值为0
      if (fadeFlag) {
        let time = setInterval(() => {
          num -= speed
          fadeFlag = false
          this.setOpacity(num)
          this.elem.style.opacity !== undefined
            ? (this.elem.style.opacity = num / 100)
            : (this.elem.style.filter = 'alpha(opacity = ' + num + ')')
          document.querySelector('#slide-ctr').style = `z-index: -1`
          if (num <= opacity) {
            clearInterval(time)
            fadeFlag = true
          }
        }, 20)
      }
    },
  }
  window.Fade = Fade
})()
let fade = new Fade('slide-ctr')

document.querySelector('#slide-switch').addEventListener('click', () => {
  if (!slideStatus) {
    fade.fadeIn(8)
    slideStatus = true
    document.querySelector('#slide-ctr').style = `z-index: 100000`
  } else {
    fade.fadeOut(8)
    slideStatus = false
  }
})
