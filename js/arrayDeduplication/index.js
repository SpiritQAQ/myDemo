// 数组去重
// [1, 1, 'a', 'A', {}, {}, NaN, NaN]

// set一把梭
function unique1(array) {
  return [...new Set(array)]
}
// indexOf
function unique2(array) {
  const result = []
  array.forEach((i) => {
    if (result.indexOf(i) === -1) result.push(i)
  })
  return result
}
// 双for
function unique3(array) {
  const result = []

  var len = array.length
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (array[j] === array[i]) {
        array.splice(j, 1)
        j--
        len--
      }
    }
  }
}

// Object 键值对
// 利用一个空的 Object 对象，我们把数组的值存成 Object 的 key 值，比如 Object[value1] = true，
// 在判断另一个值的时候，如果 Object[value2]存在的话，就说明该值是重复的。

function unique4(array) {
  const obj = {}

  return array.filter((item, index, arr) => {
    const key = `${typeof item}: ${JSON.stringify(item)}`
    // 用类型 + JSON字符串可以区分不同的对象，否则所有对象的key都是'[object Object]'

    return obj.hasOwnProperty(key) ? false : (obj[key] = true)
  })
}

var unique = unique4

export default unique
