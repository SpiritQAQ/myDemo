let person = {
  name: 'zegel',
  age: 25
}

function say(job, sex) {
  const { name, age } = this
  console.log(`name: ${name}, age: ${age}, job: ${job}, ${sex}`)
}

const JOB = 'code'
const SEX = 'male'

Function.prototype.bind2 = function (oThis) {

  if (typeof this !== 'function') {
    // closest thing possible to the ECMAScript 5
    // internal IsCallable function
    throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
  }

  var aArgs = Array.prototype.slice.call(arguments, 1)
  console.log("aArgs", aArgs)
  var fToBind = this
  var fNOP = function () { }
  var fBound = function () {
    // this instanceof fBound === true时,说明返回的fBound被当做new的构造函数调用
    console.log("fBound -> this instanceof fBound", this instanceof fBound)
    return fToBind.apply(this instanceof fBound
      ? this
      : oThis,
      // 获取调用时(fBound)的传参.bind 返回的函数入参往往是这么传递的
      aArgs.concat(Array.prototype.slice.call(arguments)));
  };

  // 维护原型关系
  if (this.prototype) {
    // 当执行Function.prototype.bind()时, this为Function.prototype
    // this.prototype(即Function.prototype.prototype)为undefined
    fNOP.prototype = this.prototype;
    console.log("fNOP -> fNOP.prototype", fNOP.prototype)
  }
  // 下行的代码使fBound.prototype是fNOP的实例,因此
  // 返回的fBound若作为new的构造函数,new生成的新对象作为this传入fBound,新对象的__proto__就是fNOP的实例
  fBound.prototype = new fNOP();

  return fBound;
};
// say.bind2(person, JOB, SEX)()
say.bind2(person, JOB)(SEX)
