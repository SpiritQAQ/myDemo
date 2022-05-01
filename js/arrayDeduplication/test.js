import unique from './index.js'

var array = [1, 1, 'a', 'a', 'A', { 1: 2 }, {}, NaN, NaN]

console.log(unique(array))
