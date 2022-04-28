// bind()方法创建一个新的函数，在bind()被调用时，这个新函数的this被bind的第一个参数指定，其余的参数将作为新函数的参数供调用时使用。

Function.prototype.bind2_1 = function (context) {
  var realArguments = [].slice.call(arguments, 1)

  var _this = this

  return function () {
    return _this.apply(context, realArguments)
  }
}
// say.bind2(person, JOB)(SEX) 需要支持类似一层科里化传参，也就是赋值后调用时还能再传一次参数
Function.prototype.bind2_2 = function (context) {
  var realArguments = [].slice.call(arguments, 1)

  var _this = this

  return function () {
    // argument转数组
    var bindArgs = [].slice.call(arguments)

    return _this.apply(context, realArguments.concat(bindArgs))
  }
}

// 当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，很怪，但是设定就是如此
Function.prototype.bind2_3 = function (context) {
  var realArguments = [].slice.call(arguments, 1)

  var _this = this
  var returnFunction = function () {
    var bindArgs = [].slice.call(arguments)

    // 分两种情况
    // 当作为普通函数时，将绑定函数的 this 指向 context
    // 当作为构造函数时，不去context ，用new的这个
    return _this.apply(
      this instanceof returnFunction ? this : context,
      realArguments.concat(bindArgs)
    )
  }
  returnFunction.prototype = this.prototype
  return returnFunction
}

// 第三步的returnFunction.prototype = this.prototype，直接修改 returnFunction.prototype 的时候，
// 也会直接修改绑定函数的 prototype。这个时候，我们可以通过一个空函数来进行中转
Function.prototype.bind2_4 = function (context) {
  var realArguments = [].slice.call(arguments, 1)

  var _this = this

  const fNOP = function () {}

  var returnFunction = function () {
    var bindArgs = [].slice.call(arguments)

    return _this.apply(
      this instanceof fNOP ? this : context,
      realArguments.concat(bindArgs)
    )
  }
  fNOP.prototype = this.prototype
  returnFunction.prototype = new fNOP()
  return returnFunction
}

Function.prototype.mdn_bind = function (oThis) {
  if (typeof this !== 'function') {
    // closest thing possible to the ECMAScript 5
    // internal IsCallable function
    throw new TypeError(
      'Function.prototype.bind - what is trying to be bound is not callable'
    )
  }

  var aArgs = Array.prototype.slice.call(arguments, 1),
    fToBind = this,
    fNOP = function () {},
    fBound = function () {
      // this instanceof fBound === true时,说明返回的fBound被当做new的构造函数调用
      return fToBind.apply(
        this instanceof fBound ? this : oThis,
        // 获取调用时(fBound)的传参.bind 返回的函数入参往往是这么传递的
        aArgs.concat(Array.prototype.slice.call(arguments))
      )
    }

  // 维护原型关系
  if (this.prototype) {
    // 当执行Function.prototype.bind()时, this为Function.prototype
    // this.prototype(即Function.prototype.prototype)为undefined
    fNOP.prototype = this.prototype
  }
  // 下行的代码使fBound.prototype是fNOP的实例,因此
  // 返回的fBound若作为new的构造函数,new生成的新对象作为this传入fBound,新对象的__proto__就是fNOP的实例
  fBound.prototype = new fNOP()

  return fBound
}

let person = {
  name: 'zegel',
  age: 25,
}

function say(job, sex) {
  const { name, age } = this
  this.job = job
  this.sex = sex
  const result = `name: ${name}, age: ${age}, job: ${job}, ${sex}`
  this.result = result
  return result
}

const JOB = 'code'
const SEX = 'male'

var newFunc = say.mdn_bind(person, JOB)
console.log(newFunc(SEX))

// newFunc.prototype.原型上的新属性 = '影响到了原函数'
const result = new newFunc(SEX)
console.log(result)

console.log(
  'result.__proto__ === say.prototype',
  result.__proto__ === say.prototype
) // 3是true 4是false  原生bind是这样的
console.log(
  'result.__proto__.__proto__ === say.prototype',
  result.__proto__.__proto__ === say.prototype
) // 3是false 4是true

// bind原文还是有些问题
