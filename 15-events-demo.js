const EventEmitter = require("events")
const CustomEmitter = new EventEmitter()

// 1. Basic example
// CustomEmitter.on('test', () => {console.log("test")})
// CustomEmitter.emit('test')

// 2. Additional info
// CustomEmitter.emit('response', "vijay", 101)

// CustomEmitter.on('response', ()=>{
//     console.log("other logic 2 recieved")
// })
// CustomEmitter.emit('response', "vijay", 101)
    
// CustomEmitter.on('response', (name)=>{
//     console.log(`other logic 1 recieved name: ${name}`)
// })
// CustomEmitter.emit('response', "vijay", 101)
    
// CustomEmitter.on('response', (name, id)=>{
//     console.log(`data recieved name: ${name} id: ${id}`)
// })
// CustomEmitter.emit('response')

// 3. http example
const http = require("http")

// using Event Emitter api (underhood httpServer extends netServer extends EventEmitter)
const server = http.createServer()

server.on('request', (req, res) => {
    res.end("Yo")
})

server.listen(5000)