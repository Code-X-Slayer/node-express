const {readFileSync, writeFileSync} = require("fs")

console.log("start")

const first = readFileSync("./content/first.txt", "utf-8")
const second = readFileSync("./content/second.txt", "utf-8")

writeFileSync(
    "./content/result_sync.txt",
    `\nHere is the result : ${first}, ${second}`,
    {flag: 'a'}
)

console.log("done with this task")
console.log("staring  with this next task")

const {readFile, writeFile} = require("fs")

console.log("start")

readFile("./content/first.txt", "utf-8", (err,result)=>{
    if(err) {console.log(err); return;}
    // console.log(`RESULT: ${result}`)
    const first = result
    readFile("./content/second.txt", "utf-8", (err,result)=>{
        if(err) {console.log(err); return;}
        // console.log(`RESULT: ${result}`)
        const second = result
        writeFile("./content/result_async.txt", `Here is the result : ${first}, ${second}`, (err, result)=>{
            if(err) {console.log(err); return;}
            // undefined since it doesnt return anything
            console.log(`RESULT: done with this task`)
        })
    })
})
console.log("staring  with this next task")