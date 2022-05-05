function myNew(constructor, ...arg) {
  var result = {}

  var value = (result = constructor.apply(result, arg))

  result.__proto__ = constructor.prototype

  if (typeof value === 'object') {
    return value
  }

  return result
}

console.log(myNew(Date))
