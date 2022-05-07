// for (var i = 0; i < 5; i++) {
//   setTimeout(function () {
//     console.log(i)
//   }, 1000)
// }

// for (let i = 0; i < 5; i++) {
//   setTimeout(function () {
//     console.log(i)
//   }, 1000 * (i + 1))
// }

for (var i = 0; i < 5; i++) {
  !(function () {
    var j = i
    return setTimeout(function () {
      console.log(i)
      console.log(j)
    }, 1000 * (j + 1))
  })()
}
