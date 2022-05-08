//    红灯 3s 亮一次，绿灯 1s 亮一次，黄灯 2s 亮一次；如何让三个灯不断交替重复亮灯？

const dir = {
  red: {
    time: 3000,
    callback: () => console.log('red'),
    next: 'green',
  },
  green: {
    time: 1000,
    callback: () => console.log('green'),
    next: 'yellow',
  },
  yellow: {
    time: 2000,
    callback: () => console.log('yellow'),
    next: 'red',
  },
}

let now = performance.now()

const func = (time, callback) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      callback()
      resolve()
      console.log(Math.floor((performance.now() - now) / 1000))
      now = performance.now()
    }, time)
  })
}

function task(light) {
  const { time, callback, next } = dir[light]
  func(time, callback).then(() => task(next))
}

task('red')
