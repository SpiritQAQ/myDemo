var arr = ['old', 1, true, ['old1', 'old2'], { old: 1 }]

var object = {
  a: {
    f: {
      d: [],
      f: function () {
        return 1
      },
      name: 'f',
    },
    name: 'real a',
  },
}

import deepClone from './index.js'

var clonedObject = deepClone(object)
var clonedArr = deepClone(arr)
object.a.name = 'fake a'
console.log('clonedObject', clonedObject)
console.log('a.name:', object.a.name, '|', clonedObject.a.name)

clonedArr[4].old = 1000
console.log('clonedArr', clonedArr)
console.log('4.old:', arr[4].old, '|', clonedArr[4].old)
