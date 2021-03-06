const gE = (el) => document.querySelector(el)
const D = document.documentElement
const WINDOWHEIGHT = D.clientHeight
const WINDOWWIDTH = D.clientWidth

const BLOCK0HEIGHT = 1000

// 第一模块的动画高度 初步定5000
const BLOCK1HEIGHT = 3000

const BLOCK2HEIGHT = 10000

const BLOCK3HEIGHT = gE('#block3').clientHeight

const BLOCK4HEIGHT = gE('#block4').clientHeight

const CANVASWIDTH = gE('#iPhone-se').width

let showingFrame = null

// function toogleSticky(el, isSticky) {
//   if (isSticky) {
//     el.style = 'position: sticky'
//   } else {
//     el.style = 'position: relative'
//   }
// }

window.addEventListener('scroll', () => {
  if (D.scrollTop <= BLOCK0HEIGHT) {
    const headerScrolled = D.scrollTop / BLOCK0HEIGHT
    handleTextSlide(gE('#phone-name'), headerScrolled, 0.02, 0.4, 0.7, 0.9)
    handleTextSlide(gE('#row2'), headerScrolled, 0.06, 0.44, 0.7, 0.9)
    handleTextSlide(gE('#row3'), headerScrolled, 0.1, 0.48, 0.7, 0.9)
    handleTextSlide(gE('#row4'), headerScrolled, 0.14, 0.52, 0.7, 0.9)
  } else {
    gE('#phone-name').style.opacity = 0
    gE('#row2').style.opacity = 0
    gE('#row3').style.opacity = 0
    gE('#row4').style.opacity = 0
  }
  if (
    D.scrollTop <= BLOCK1HEIGHT + BLOCK0HEIGHT - WINDOWHEIGHT &&
    D.scrollTop > BLOCK0HEIGHT
  ) {
    // 手机旋转即BLOCK1相关逻辑
    // 已滚动百分比 0~1
    // 已滚动高度 / 块总高度 - 一屏高度
    let scrolled = (D.scrollTop - BLOCK0HEIGHT) / (BLOCK1HEIGHT - WINDOWHEIGHT)

    let frame = Math.ceil(scrolled * 84)
    changeFrame(frame)

    if (scrolled <= 0.6) {
      if (scrolled >= 0.3) {
        const ratio = (scrolled - 0.3) / 0.3
        gE('#iPhone-se').style = `transform: translateX(${
          (-CANVASWIDTH / 4) * ratio
        }px`
      }
    } else {
      const ratio = (scrolled - 0.6) / (1 - 0.6)
      gE('#iPhone-se').style = `transform: translateX(${
        -CANVASWIDTH / 4 + (CANVASWIDTH * ratio) / 2
      }px`
    }
    handleTextSlide(gE('.se-text-right'), scrolled, 0.5, 0.6, 0.7, 0.8)
    handleTextSlide(gE('.se-text-left'), scrolled, 0.82, 0.9)
  } else if (
    D.scrollTop > +BLOCK1HEIGHT &&
    D.scrollTop <= +BLOCK1HEIGHT + BLOCK2HEIGHT
  ) {
    let scrolled = (D.scrollTop - BLOCK1HEIGHT) / BLOCK2HEIGHT

    handleTextSlide(gE('#chip-header'), scrolled, 0.1, 0.25, 0.35, 0.42, '-50%')
    handleChipGradient(scrolled, 0.35, 1)
  } else if (
    D.scrollTop > +BLOCK1HEIGHT + BLOCK2HEIGHT &&
    D.scrollTop <= +BLOCK1HEIGHT + BLOCK2HEIGHT + BLOCK3HEIGHT
  ) {
    let scrolled = (D.scrollTop - BLOCK1HEIGHT - BLOCK2HEIGHT) / BLOCK3HEIGHT

    const blackEl = gE('.black-phone')
    const whiteEl = gE('.white-phone')
    const redEl = gE('.red-phone')

    if (scrolled >= 1 / 3) {
      whiteEl.style.clipPath = `inset(${
        ((2 / 3 - scrolled) / (1 / 3)) * 100
      }% 0px 0px 0px)`
      redEl.style.clipPath = `inset(100% 0px 0px 0px)`
    }
    if (scrolled >= 2 / 3) {
      redEl.style.clipPath = `inset(${
        ((1 - scrolled) / (1 / 3)) * 100
      }% 0px 0px 0px)`
    }
    if (scrolled >= 1) {
      redEl.style.clipPath = `none`
    }
  } else if (
    D.scrollTop > +BLOCK1HEIGHT + BLOCK2HEIGHT + BLOCK3HEIGHT &&
    D.scrollTop <= +BLOCK1HEIGHT + BLOCK2HEIGHT + BLOCK3HEIGHT + BLOCK4HEIGHT
  ) {
    let scrolled =
      (D.scrollTop - BLOCK1HEIGHT - BLOCK2HEIGHT - BLOCK3HEIGHT) / BLOCK4HEIGHT

    handleTextSlide(gE('#text-1'), scrolled, 0.5, 0.6, 1, 1, '-50%')
    handleTextSlide(gE('#text-2'), scrolled, 0.9, 1, 1, 1, '-50%')
  }
})

const images = []

/**
 * 为了保证第一帧url正确，async await
 */
async function awaitImageFunc() {
  for (let i = 0; i < 85; i++) {
    const url = `./assets/iPhoneSE/iphone-se.${`0${i + 1}`.slice(-2)}.png`
    var img = new Image()
    img.src = url
    let promise = new Promise((resolve) => {
      img.onload = function () {
        images[i] = img
        if (i === 0) {
          changeFrame(0)
        }
        resolve()
      }
    })
    await promise
  }
}
awaitImageFunc()

function drawIPhone(idx) {
  let context = document.querySelector('#iPhone-se').getContext('2d')
  if (images[idx]) context.drawImage(images[idx], 0, 0, 432, 976)
}

/**
 * changeFrame 关键帧回调
 *
 * @param {*} frameIdx
 */
function changeFrame(frameIdx) {
  if (showingFrame === frameIdx) return
  showingFrame = frameIdx
  let idx = frameIdx - 1
  if (frameIdx < 1) idx = 0
  if (frameIdx > 85) idx = 84

  let context = document.querySelector('#iPhone-se').getContext('2d')
  drawIPhone(idx)
}

/**
 *
 * 处理文字滚动和透明的动画
 * @param {Element} el
 * @param {number} scrolled 容器已经滚动比值
 * @param {number} startShowRatio 开始展示时的滚动比值
 * @param {number} endShowRatio 结束展示的滚动比值
 * @param {number} startHideRatio 开始隐藏的滚动比值
 * @param {number} endHideRatio 结束隐藏的滚动比值
 * @param {string} translateX 是否有translatex
 */
function handleTextSlide(
  el,
  scrolled,
  startShowRatio,
  endShowRatio,
  startHideRatio,
  endHideRatio,
  translateX
) {
  var opacity = el.style?.opacity > 0 ? el.style?.opacity : 0
  var translateY = translateX
    ? el.style.transform.split(',')[1]?.split('%')[0] / 100 || 0
    : el.style.transform.split('translateY(')[1]?.split('%')[0] / 100 || 0
  if (scrolled < startShowRatio) {
    opacity = 0
    translateY = 0
  }
  if (scrolled >= startShowRatio && scrolled <= endShowRatio) {
    opacity = (scrolled - startShowRatio) / (endShowRatio - startShowRatio)
    translateY =
      ((scrolled - startShowRatio) / (endShowRatio - startShowRatio)) * -0.3
  }

  if (scrolled >= startHideRatio && scrolled <= endHideRatio) {
    opacity = (endHideRatio - scrolled) / (endHideRatio - startHideRatio)
    translateY =
      -((scrolled - startHideRatio) / (endHideRatio - startHideRatio)) * 0.3 -
      0.3
  }
  if (scrolled > endHideRatio) {
    opacity = 0
  }
  el.style = translateX
    ? `opacity: ${opacity}; transform: translate(${translateX}, ${
        translateY * 100
      }%)`
    : `opacity: ${opacity}; transform: translateY(${translateY * 100}%)`
}

/**
 * 处理A13的动画
 *
 * @param {*} scrolled
 * @param {*} startShowRatio
 * @param {*} endShowRatio
 */
function handleChipGradient(scrolled, startShowRatio, endShowRatio) {
  const maskEl = gE('#chip-mask')
  const canvasEl = gE('#chip-canvas')
  const svgEl = gE('#A13')
  const svgBgEl = gE('.chip-bg')
  const chipContentEl = gE('#chip-content')

  // var scale =
  if (scrolled < startShowRatio) svgEl.style.opacity = 0
  if (scrolled >= startShowRatio) {
    svgEl.style.opacity = (scrolled - startShowRatio) * 5
    chipContentEl.style.width = chipContentEl.style.height = `${
      WINDOWWIDTH * 150 * (scrolled - startShowRatio) ** 3
    }px`
  }
  if (scrolled > 0.55) {
    svgBgEl.style.opacity = (1 - scrolled) / 0.45 - 0.1
    chipContentEl.classList.add('transparent')
  } else {
    chipContentEl.classList.remove('transparent')
    svgBgEl.style.opacity = 1
  }

  if (scrolled > 0.9) {
    chipContentEl.style.opacity = (1 - scrolled) / 0.1
  } else {
    chipContentEl.style.opacity = 1
  }
}

/**
 * drawChip A13画布canvas模拟函数
 *
 * 想要中心永远对齐
 * 绘制的对照起点应该是 中心点左上(半宽度, 半宽度)
 * 起始状态为
 * canvas无法从第四象限开始画，故放弃用svg转canvas模拟JSON动画转canvas
 * 直接用SVG好了
 */
