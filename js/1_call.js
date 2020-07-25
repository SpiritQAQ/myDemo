let person = {
  name: "zegel",
  age: 25
};

function say(job, sex) {
  const { name, age } = this
  console.log(`name: ${name}, age: ${age}, job: ${job}, ${sex}`)
  return `name: ${name}, age: ${age}, job: ${job}, ${sex}`
}

// say.call(person, 'code')
// say.apply(person, ['code', 'man'])

// 自定义call
Function.prototype.call2 = function (context) {
  // this === say
  // console.log(this === say)
  context = context || window
  context.fn = this

  var fnArguments = []

  for (var i = 1; i < arguments.length; i++) {
    fnArguments.push('arguments[' + i + ']')
  }

  // eval() 函数会将传入的字符串当做 JavaScript 代码进行执行。
  var result = eval('context.fn(' + fnArguments + ')')

  // 2 es6写法
  // var result = context.fn(...aArgs)

  delete context.fn

  return result


}

Function.prototype.apply2 = function (context, arr) {
  var context = Object(context) || window;
  context.fn = this;

  var result;
  if (!arr) {
    result = context.fn();
  }
  else {
    var args = [];
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push('arr[' + i + ']');
    }
    result = eval('context.fn(' + args + ')')
  }

  delete context.fn
  return result;
}

say.call2(person, 'code', 'man')
// say.apply2(person, ['code', 'man'])


