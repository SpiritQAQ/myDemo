const isArray = (arr) => Array.isArray(arr)
// 1. 递归
function flatten1(arr) {
  var result = []

  arr.forEach((item) => {
    if (isArray(item)) {
      result = result.concat(flatten1(item))
    } else {
      result.push(item)
    }
  })

  return result
}

// 纯数字可以用toString
function flatten2(arr) {
  return arr
    .toString()
    .split(',')
    .map(function (item) {
      return +item
    })
}

// reduce
function flatten3(arr) {
  return arr.reduce((prev, next) => {
    return prev.concat(isArray(next) ? flatten3(next) : next)
  }, [])
}

// 拓展运算符
function flatten4(arr) {
  while (arr.find((item) => isArray(item))) {
    arr = [].concat(...arr)
  }

  return arr
}

var flatten = flatten4

export default flatten
