import { dir } from './test.js'
let now = performance.now()

const handle = (light) => {
  const { time, callback, next } = dir[light]
  return new Promise((resolve) =>
    setTimeout(() => {
      console.log((performance.now() - now) / 1000)
      now = performance.now()
      callback()
      resolve(next)
    }, time)
  )
}

const task = async (color) => {
  const nextcolor = await handle(color)
  return task(nextcolor)
}

task('red')
