// test1
// console.log('1');

// setTimeout(function () {
//   console.log('2');
//   process.nextTick(function () {
//     console.log('3');
//   })
//   new Promise(function (resolve) {
//     console.log('4');
//     resolve();
//   }).then(function () {
//     console.log('5')
//   })
// })
// process.nextTick(function () {
//   console.log('6');
// })
// new Promise(function (resolve) {
//   console.log('7');
//   resolve();
// }).then(function () {
//   console.log('8')
// })

// setTimeout(function () {
//   console.log('9');
//   process.nextTick(function () {
//     console.log('10');
//   })
//   new Promise(function (resolve) {
//     console.log('11');
//     resolve();
//   }).then(function () {
//     console.log('12')
//   })
// })

// texst2
// console.log('script start')

// async function async1() {
//   await async2()
//   console.log('async1 end')
// }
// async function async2() {
//   console.log('async2 end')
// }
// async1()

// setTimeout(function () {
//   console.log('setTimeout')
// }, 0)

// new Promise(resolve => {
//   console.log('Promise')
//   resolve()
// })
//   .then(function () {
//     console.log('promise1')
//   })
//   .then(function () {
//     console.log('promise2')
//   })

// console.log('script end')

// await async2()
// console.log('async1 end')
// 相当于
// Promise.resolve(async2()).then(() => {
//   console.log('async1 end')
// })

// 3
const log = (a) => console.log(a)
function sleep(seconds) {
  var start = new Date()
  while (new Date() - start < seconds * 1000) {
  }
  return
}
setTimeout(() => {
  log('a')
}, 3000)
sleep(0)      //不断重复做一些无意义的工作才能保证js运行按顺序
setTimeout(() => {
  log('b')
}, 1000)