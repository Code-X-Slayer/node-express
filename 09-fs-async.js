const {readFile, writeFile} = require("fs")

// callback hell implementation
readFile("./content/first.txt", "utf-8", (err,result)=>{
    if(err) {console.log(err); return;}
    // console.log(`RESULT: ${result}`)
    const first = result
    readFile("./content/second.txt", "utf-8", (err,result)=>{
        if(err) {console.log(err); return;}
        // console.log(`RESULT: ${result}`)
        const second = result
        // writeFile("./content/result_async.txt", `Here is the result : ${first}, ${second}`, {flag:'a'})
        writeFile("./content/result_async.txt", `Here is the result : ${first}, ${second}`, (err, result)=>{
            if(err) {console.log(err); return;}
            // undefined since it doesn;t return anything
            console.log(`RESULT: ${result}`)
        })
    })
})