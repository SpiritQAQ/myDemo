//    红灯 3s 亮一次，绿灯 1s 亮一次，黄灯 2s 亮一次；如何让三个灯不断交替重复亮灯？
function red() {
  console.log('red')
}
function green() {
  console.log('green')
}
function yellow() {
  console.log('yellow')
}

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

function task(light) {
  const { time, callback, next } = dir[light]
  setTimeout(() => {
    console.log(performance.now() - now)
    now = performance.now()
    callback()
    task(next)
  }, time)
}

task('red')
