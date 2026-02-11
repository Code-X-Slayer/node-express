// Streams
// 4 types: Readable Writeable Duplex Transform
// Unlike normal read and write does for entire file streams do it chunk by chunk
// making it reliable for heavy large files and dont wait for whole content

// const {createReadStream} = require("fs")

// 1. Basic example
// const Stream = createReadStream("./content/big.txt")
// Stream.on('data', (result) =>{
//     console.log(result)
// })

// 2. Additional info
// default 64kb
// last buffer - remainder
// highWaterMark - control size

// const ReadStream = createReadStream("./content/big.txt", {
//     highWaterMark: 9*1024,
//     // encoding: 'utf-8'
// })
// ReadStream.on('data', (result) =>{
//     console.log(result)
// })
// ReadStream.on('error', (err) => {
//     console.log(err)
// })

// 3. http example

const http = require("http")
const fs = require("fs")

// version 1 : sending whole file to user (bad practice)
// let server = http.createServer((req, res) => {
//     const text = fs.readFileSync('./content/big.txt', 'utf-8')
//     res.end(text)
// })

// server.listen(5000)

// version 2 : sending whole file to user
let server = http.createServer((req, res) => {
    const fileStream = fs.createReadStream('./content/big.txt', 'utf-8')
    fileStream.on('open', () => {
        fileStream.pipe(res)
    })
    fileStream.on('error', (err) => {
        res.end(err)
    })
})

server.listen(5000)