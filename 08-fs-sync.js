const {readFileSync, writeFileSync, read} = require("fs")

const first = readFileSync("./content/first.txt", "utf-8")
const second = readFileSync("./content/second.txt", "utf-8")

console.log(first)
console.log(second)

writeFileSync("./content/result_sync.txt", `Here is the result : ${first}, ${second}`)
writeFileSync("./content/result_sync.txt", `\nHere is the result : ${first}, ${second}`, {flag: 'a'})

const result = readFileSync("./content/result_sync.txt", "utf-8")
console.log(result)