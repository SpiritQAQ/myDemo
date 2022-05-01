export default function myInstanceof(object, constructor) {
  try {
    if (!object || !['function', 'object'].includes(typeof object)) return false

    var proto = Object.getPrototypeOf(object)

    // 递归
    if (proto === constructor.prototype) {
      return true
    } else if (proto == null) {
      return false
    } else {
      return myInstanceof(proto, constructor)
    }

    // 循环 选一个就行
    while (true) {
      if (proto === constructor.prototype) return true
      if (proto === null) return false

      proto = Object.getPrototypeOf(proto)
    }
  } catch (e) {
    console.log('Error:', e)
  }
}
