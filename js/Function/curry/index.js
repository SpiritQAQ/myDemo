function curry(fn, ...arg) {
  const length = fn.length

  return function () {
    const args = [...arg, ...arguments]

    if (args.length < length) {
      return curry(fn, ...args)
    } else {
      return fn.apply(this, args)
    }
  }
}

function curry2(fn, ...arg) {
  const length = fn.length

  let argList = []

  return function c(...args) {
    argList = [...argList, ...args]

    if (argList.length >= length) {
      return fn.apply(this, argList)
    }

    return c
  }
}

export default curry
