const http = require("http")
const { readFileSync } = require("fs")

const homePage = readFileSync("./navbar-app/index.html")
const homeStyles = readFileSync("./navbar-app/styles.css")
const homeLogo = readFileSync("./navbar-app/logo.svg")
const homeScript = readFileSync("./navbar-app/browser-app.js")

const sever = http.createServer((req, res) => {
    const url = req.url
    // home page
    if (url === '/') {
        res.writeHead(200, { 'content-type': 'text/html' })
        res.write(homePage)
        res.end()
    }
    // styles.css
    else if (url === '/styles.css') {
        res.writeHead(200, { 'content-type': 'text/css' })
        res.write(homeStyles)
        res.end()
    }
    // logo.svg
    else if (url === '/logo.svg') {
        res.writeHead(200, { 'content-type': 'image/svg+xml' })
        res.write(homeLogo)
        res.end()
    }
    // browser-app.js
    else if (url === '/browser-app.js') {
        res.writeHead(200, { 'content-type': 'text/javascript' })
        res.write(homeScript)
        res.end()
    }
    // about page
    else if (url === '/about') {
        res.writeHead(200, { 'content-type': 'text/html' })
        res.write('<h1>About Page</h1>')
        res.end()
    }
    // error page
    else {
        res.writeHead(404, { 'content-type': 'text/html' })
        res.write('<h1>Page not found</h1>')
        res.end()
    }
})

sever.listen(5000, () => { console.log('server listening on port http://localhost:5000') })