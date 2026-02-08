// // 1. readfile example

// const {readFile} = require("fs")

// // since readFile is async starting next task doen first
// console.log("starting first task")

// readFile("./content/first.txt", "utf-8", (err,res)=>{
//     if(err) {console.log(err); return;}
//     console.log(res)
//     console.log("completed first task")
// })

// console.log("starting next task")

// // 2. setTimeout example

// // started os process
// console.log("first")
// setTimeout(() => {
//     console.log("second")
// }, 0)
// console.log("third")
// // completed and exiting os process

// // 3. setInterval exmaple
// let c = 0
// setInterval(() => {
//     console.log(`Opeartion ${c++}`)
// }, 2000)
// console.log("I will run first")
// // process stays alive unless kill process or ctrl+c unexpected error

// // 4. server exmaple
// const http = require("http")

// const server = http.createServer((req,res)=>{
//     console.log("request event")
//     res.end("hello")
// })

// server.listen(5000, ()=>{
//     console.log(`Server listening on port 5000: http://localhost:5000`)
// })

// let k = 0
// setInterval(() => {
//     console.log(`Performing opertion: ${k++}`)
// }, 5000)
// // process stays alive unless kill process or ctrl+c unexpected error