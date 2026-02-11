const http = require("http")

const server = http.createServer((req,res) => {
    if(req.url === '/'){
        return res.end('Welcome to home page')
    }
    if(req.url === '/about'){
        return res.end('About page')
    }
    res.end(`
        <h1>OOPS!</h1>
        <p>We cant seem to find the page you are looking for</p>
        <a href="/">back home</a>
    `)
})

server.listen(5000)

console.log(`http://localhost:5000/`)