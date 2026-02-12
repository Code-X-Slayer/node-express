const express = require('express')
const app = express()

app.get('/', (req, res) => {
    console.log('user hit the resource')
    res.status(200).send('HomePage')
})

app.get('/about', (req, res) => {
    console.log('user hit the resource')
    res.status(200).send('About Page')
})

app.all('*splat', (req, res) => {
    res.status(404).send('<h1>page not found</h1>')
})

app.listen(5000, () => {
    console.log('server listening on port http://localhost:5000')
})