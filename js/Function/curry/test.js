import curry from './index.js'
import _ from 'lodash'

// function add(a, b, c, d, e) {
//   const arr = [...arguments]
//   return arr.reduce((acr, cur) => acr + cur)
// }

// const curryAdd = curry(add)

// const result = curryAdd(1, 2, 3)(2, 3)
// console.log(result)

//

function add(a, b, c) {
  console.log(a + b + c)
}

const addCurr = curry(add)
addCurr(1, 2, 3, 4)
const addCurr2 = curry(add)
addCurr2(1, 2)(3)
const addCurr3 = curry(add)
addCurr3(1)(2, 3)
const addCurr4 = curry(add)
addCurr4(1)(2)(3)
const addCurr5 = curry(add)
addCurr5(1)()()(2)()()()(3)
