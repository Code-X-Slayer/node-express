const os = require("os")

// info about curr user
const user = os.userInfo()
console.log(user)


// method returns the system uptime in seconds
console.log(`System Uptime: ${os.uptime()} seconds`)

const currentOS = {
    name: os.type(),
    release: os.release(),
    totalmem_bytes: os.totalmem(),
    totalmem_kilobytes: os.totalmem()/1024,
    totalmem_megabytes: os.totalmem()/1024/1024,
    totalmem_gigabytes: os.totalmem()/1024/1024/1024,
    freemem_bytes: os.freemem(),
    freemem_kilo_bytes: os.freemem()/1024,
    freemem_megabytes: os.freemem()/1024/1024,
    freemem_gigabytes: os.freemem()/1024/1024/1024,
    cpus:os.cpus().length
}

console.log(currentOS)
