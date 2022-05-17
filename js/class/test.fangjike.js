import { Cat, Animal } from './fangjike.js'

const cat1 = new Cat()
window.cat1 = cat1
console.log('🚀 ~ file: test.fangjike.js ~ line 4 ~ cat1', cat1)

console.log('private name', cat1.name)
console.log('set name', cat1.setName('Dili'))
console.log('get name', cat1.getName())
console.log('getUltimateAnswer', cat1.getUltimateAnswer())
