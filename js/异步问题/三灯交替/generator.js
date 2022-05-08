import { dir } from './test.js'
let now = performance.now()

function* ShowColor(color) {
  const nextColor = yield task(color)
  yield* ShowColor(nextColor)
}

const showColor = ShowColor('red')

const task = (light) => {
  const { time, callback, next } = dir[light]
  setTimeout(() => {
    console.log(Math.floor((performance.now() - now) / 1000))
    now = performance.now()
    callback()
    showColor.next(next)
  }, time)
}

showColor.next()
