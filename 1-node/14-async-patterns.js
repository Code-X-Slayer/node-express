// // 1. blocking code (sync blocks other requests)

// const http = require("http")

// const server = http.createServer((req, res) => {
//     if(req.url==="/") {res.end("Home")}
//     else if(req.url==="/about") {
//         // blocking code
//         for(let i=0; i<200; i++){
//             for(let j=0; j<400; j++){
//                 console.log(`${i} ${j}`)
//             }
//         }
//         res.end("About")
//     }
//     else res.end("Error")
// })

// server.listen(5000, () => {
//     console.log(`Listening on port 5000...`)
// })

// // 2. setup promises
// const {readFile} = require("fs")

// const getText = (path) => {
//     return new Promise((resolve, reject) => {
//         readFile(path, 'utf-8', (err, data) => {
//             if(err) reject(err)
//             else resolve(data)
//         })
//     })
// }

// // getText('./conent/first.txt').then((result) => console.log(result)).catch((err) => console.log(err))
// getText('./content/first.txt').then((result) => console.log(result)).catch((err) => console.log(err))

// // 3. refactor to async
// const start = async() => {
//     try{
//         const first = await getText('./content/first.txt')
//         console.log(first)
//         const second = await getText('./content/second.txt')
//         console.log(second)
//     }
//     catch (error) {
//         console.log(error)
//     }
// }

// start()

// // 4. node's native format
// // const {readFile, writeFile} = require("fs")
// const {readFile, writeFile} = require("fs").promises
// const util = require("util")
// // const readFilePromise = util.promisify(readFile)
// // const writeFilePromise = util.promisify(writeFile)

// const start2 = async() => {
//     try{
//         // const first = await readFilePromise('./content/first.txt', 'utf-8')
//         const first = await readFile('./content/first.txt', 'utf-8')
//         console.log(first)
//         // const second = await readFilePromise('./content/second.txt', 'utf-8')
//         const second = await readFile('./content/second.txt', 'utf-8')
//         console.log(second)
//         // await writeFilePromise('./content/result-mind-grenade.txt', `THIS IS SUPERRR\n${first}\n${second}`)
//         await writeFile('./content/result-mind-grenade.txt', `THIS IS SUPERRR\n${first}\n${second}`)
//     }
//     catch (error) {
//         console.log(error)
//     }
// }

// start2()