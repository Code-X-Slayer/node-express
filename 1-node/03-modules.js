// CommonJs everyfile is module (by default)
// Modules - Encapsulated Code (only share miunimum)

// Exported to 3-data-names.js
// const secret = "secret" // this is accesible in entire file we want it to not access
// const john = "john"
// const peter = "peter"
// const susan = "susan"

// Exported to 3-utils-demo.js
// const sayHi = (name) =>{
//     console.log(`Hello there ${name}`)
// }

const names = require("./03-data-names")
const utils = require("./03-utils-demo")

console.log(names)
console.log(utils)

utils.sayHi(names.john)
utils.sayHi(names.peter)
utils.sayHi(names.susan)