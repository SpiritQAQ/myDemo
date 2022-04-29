const log = (v) => {
  console.log(v)
}
// let promise1 = function() {
//   let timeout = Math.random() * 2
//   return  new Promise((resolve, reject) => {
//     if(timeout > 1){
//       log('call resolve()...');
//       resolve('200 OK');
//     } else {
//       log('call reject()...');
//       reject('timeout in ' + timeout + ' seconds.');
//     }

//   })
// }
// promise1()
//   .then(v => console.log(v))
//   .catch(err=> console.log(err))
function step1(resolve, reject) {
  // setTimeout(function(){
  resolve(1)
  // },3000)
}
// function step2( resolve , reject ) {
// console.log("TCL: n", n)
//   setTimeout(function(){
//     resolve(JSON.stringify(n)+console.log('2'));
//   },3000)
// }
// function step2( n ) {
//   console.log("TCL: step2", n)
//     // setTimeout(function(){
//       console.log(n+1)
//       return new Promise(( resolve , reject) => {
//         resolve(n+1)
//       })
//       // resolve(JSON.stringify(n)+'2');
//     // },3000)
//   }
// // function step3( resolve , reject ) {
// //   setTimeout(function(){
// //     resolve(console.log(JSON.stringify(n)+'3'));
// //   },3000)
// // }
// new Promise(step1)
// // .then((n)=> new Promise(step2(n)))
// // .then((n)=> new Promise(step2(n)))
// .then((n)=> step2(n))
// .then((n)=> step2(n))

function 买菜() {
  log('买菜ing')
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      const r = ['西红柿', '鸡蛋', '油菜']
      log('买菜ok', r)
      resolve(r)
    }, 3000)
  })
}
function 做饭(data) {
  return new Promise((resolve, reject) => {
    console.log('做饭ing')

    setTimeout(function () {
      //对做好的饭进行下一步处理。
      const result = {
        主食: '米饭',
        菜: [data[0] + data[1], data[1] + data[2]],
      }
      log('做饭ok', result)

      resolve(result)
    }, 3000)
  })
}
function 送饭(data) {
  log('送饭ing')
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      const r = JSON.stringify(data)
      log('送到了', r)
      //对做好的饭进行下一步处理。
      resolve('送到的饭是' + r)
    }, 3000)
  })
}
// function 送饭(resolve,reject){
//   //对送饭的结果进行下一步处理
//   resolve('收到饭');
// }
function 电话通知我(n) {
  //电话通知我后的下一步处理
  //给保姆加100块钱奖金;
  // log('电话通知' + n)
  return '电话通知' + n
}

// 买菜()
//   //用买好的菜做饭
//   .then((买好的菜) => {
//     return 做饭(买好的菜);
//   })
//   //把做好的饭送到老婆公司
//   .then((做好的饭) => {
//     return (送饭(做好的饭));
//   })
//   //送完饭后打电话通知我
//   .then((送饭结果) => {
//     电话通知我(送饭结果);
//   })

;(async () => {
  let 蔬菜 = await 买菜()
  let 饭菜 = await 做饭(蔬菜)
  let 送饭结果 = await 送饭(饭菜)
  let 通知结果 = await 电话通知我(送饭结果)
  console.log(通知结果)
})()
