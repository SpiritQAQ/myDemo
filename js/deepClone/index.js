export default function deepClone(obj) {
  if (!obj || typeof obj !== 'object') throw new Error('不是对象或者数组')

  var resultObj = obj instanceof Array ? [] : {}
  for (var key in obj) {
    // 因为for in 不仅遍历对象自身属性，还会遍历继承的inumerable 属性，这里只拷贝自身属性。
    if (obj.hasOwnProperty(key)) {
      typeof obj[key] === 'object'
        ? (resultObj[key] = deepClone(obj[key]))
        : (resultObj[key] = obj[key])

      // newObj[key] = obj[key];
      // 浅拷贝就直接等于就行了，不用判断是否是引用类型
    }
  }

  return resultObj
}
