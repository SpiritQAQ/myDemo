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

Function.prototype.new_bind = function (context) {
  var args = [].slice.call(arguments, 1)

  var _this = this

  var fNOP = function () {}

  var fBOUND = function () {
    var _args = args.concat([].slice.call(arguments))

    return _this.apply(this instanceof fNOP ? this : context, _args)
  }

  fNOP.prototype = this.prototype
  fBOUND.prototype = new fNOP()

  return fBOUND
}

var newFunc = say.new_bind(person, JOB)
console.log(newFunc.prototype)

console.log(newFunc(SEX))

// newFunc.prototype.原型上的新属性 = '影响到了原函数'
const result = new newFunc(SEX)
console.log(result)

console.log(
  'result.__proto__ === say.prototype',
  result.__proto__ === say.prototype
) // 3是true 4是false
console.log(
  'result.__proto__.__proto__ === say.prototype',
  result.__proto__.__proto__ === say.prototype
) // 3是false 4是true
