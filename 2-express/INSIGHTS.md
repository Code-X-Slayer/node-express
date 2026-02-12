# Express.js — Quick-Reference Cheat Sheet

> Every concept covered in this folder, organized topic-by-topic.
> Use this as a **revision sheet** — one look and you're back up to speed.

---

## 1 · HTTP Basics Recap (Without Express)

Before using Express, it's important to understand what it **replaces**.

### Creating a Server With Raw `http`

```js
const http = require('http')

const server = http.createServer((req, res) => {
    const url = req.url
    if (url === '/') {
        res.writeHead(200, { 'content-type': 'text/html' })
        res.write('<h1>Home Page</h1>')
        res.end()
    }
    else if (url === '/about') {
        res.writeHead(200, { 'content-type': 'text/html' })
        res.write('<h1>About Page</h1>')
        res.end()
    }
    else {
        res.writeHead(404, { 'content-type': 'text/html' })
        res.write('<h1>Page not found</h1>')
        res.end()
    }
})
```

### Key Points

| Concept | Detail |
|---------|--------|
| `res.writeHead(status, headers)` | Set HTTP status code and headers |
| `content-type` | Tells the browser how to interpret the response |
| `text/html` | Render as HTML |
| `text/css` | Interpret as CSS |
| `text/javascript` | Interpret as JS |
| `image/svg+xml` | Interpret as SVG image |

**File:** `01-http-basics.js`

---

## 2 · Serving a Full App With Raw HTTP

When serving an HTML page that references CSS, JS, and images — you must **manually handle every single asset request**:

```js
const homePage = readFileSync('./navbar-app/index.html')
const homeStyles = readFileSync('./navbar-app/styles.css')
const homeLogo = readFileSync('./navbar-app/logo.svg')
const homeScript = readFileSync('./navbar-app/browser-app.js')

const server = http.createServer((req, res) => {
    if (req.url === '/')             { /* serve HTML */ }
    else if (req.url === '/styles.css')    { /* serve CSS */ }
    else if (req.url === '/logo.svg')      { /* serve SVG */ }
    else if (req.url === '/browser-app.js') { /* serve JS */ }
    // ... and so on for every file
})
```

### The Problem

- You have to **manually read** every file.
- You have to **manually set** the correct `content-type` for each.
- You have to write a **new `if` block** for every asset.
- This does **not scale** — this is why Express exists.

**File:** `02-http-app.js`

---

## 3 · Express Basics

Express is a **minimal, unopinionated web framework** for Node.js. It replaces the boilerplate of `http.createServer`.

### Installation

```bash
npm i express
```

### Hello World

```js
const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.status(200).send('Home Page')
})

app.get('/about', (req, res) => {
    res.status(200).send('About Page')
})

app.all('*splat', (req, res) => {
    res.status(404).send('<h1>Page not found</h1>')
})

app.listen(5000, () => {
    console.log('Server listening on port 5000')
})
```

### Key Concepts

| Method | Purpose |
|--------|---------|
| `app.get(path, handler)` | Handle GET requests to a specific path |
| `app.all(path, handler)` | Handle **any** HTTP method for a path |
| `res.status(code)` | Set the HTTP status code |
| `res.send(data)` | Send a response (auto-detects content type) |
| `app.listen(port, cb)` | Start the server on a port |

### `app.all('*splat')` — Catch-All Route

- Matches any route **not handled** by previous routes.
- Must be placed **after** all specific routes.
- Acts as a **404 handler**.

**File:** `03.express-basics.js`

---

## 4 · Serving Files With Express

### `express.static()` — Static Files Middleware

```js
app.use(express.static('./public'))
```

- Serves **all files** inside the `./public` folder automatically.
- No need to manually route CSS, JS, images, etc.
- Accessed directly by filename: `http://localhost:5000/index.html`.

### `res.sendFile()` — Serve a Specific File

```js
const path = require('path')

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'navbar-app', 'index.html'))
})
```

- Sends a **single file** as the response.
- Must use an **absolute path** → use `path.resolve()`.

### Static vs sendFile

| Approach | Use Case |
|----------|----------|
| `express.static()` | Serve an entire folder of assets (CSS, JS, images) |
| `res.sendFile()` | Serve a specific HTML file for a specific route |

You often **combine both**: `express.static` for assets + `res.sendFile` for routes.

**Files:** `04-express-app.js`, `05-all-static.js`

---

## 5 · Fully Static Server

```js
const express = require('express')
const app = express()

app.use(express.static('./public'))

app.all('/*splat', (req, res) => {
    res.status(404).send('Resource not found')
})

app.listen(5000)
```

- When `index.html` is in the `public/` folder, visiting `/` serves it **automatically**.
- No `app.get('/')` route needed — `express.static` handles it.
- This is how you deploy a **static website** (HTML + CSS + JS) with Express.

**File:** `05-all-static.js`

---

## 6 · Sending JSON Responses

```js
const { products } = require('./data')

app.get('/', (req, res) => {
    res.json(products)
})
```

### `res.json()` vs `res.send()`

| Method | Behavior |
|--------|----------|
| `res.json(data)` | Converts to JSON, sets `Content-Type: application/json` |
| `res.send(data)` | Auto-detects type (string → HTML, object → JSON) |

**Best practice:** Use `res.json()` explicitly for API endpoints — makes intent clear.

### Data Module Pattern

```js
// data.js
const products = [ { id: 1, name: 'sofa', price: 39.95 }, ... ]
const people = [ { id: 1, name: 'john' }, ... ]
module.exports = { products, people }
```

Separate your data into its own module → keep route handlers clean.

**File:** `06.basic-json.js`, `data.js`

---

## 7 · Route Parameters

Dynamic segments in the URL, prefixed with `:`.

```js
app.get('/api/products/:productID', (req, res) => {
    const { productID } = req.params
    const product = products.find(p => p.id === Number(productID))
    if (!product) return res.status(404).send('Not Found')
    res.json(product)
})
```

### Multiple Parameters

```js
app.get('/api/products/:productID/reviews/:reviewID', (req, res) => {
    console.log(req.params)
    // { productID: '1', reviewID: '42' }
})
```

### Key Points

- `req.params` is an **object** with all route parameter values.
- Parameter values are always **strings** — convert with `Number()` if needed.
- Use `.find()` to locate a single item, return **404** if not found.

---

## 8 · Query Strings

```
GET /api/v1/query?search=alb&limit=2
```

```js
app.get('/api/v1/query', (req, res) => {
    const { search, limit } = req.query

    let results = [...products]

    if (search) {
        results = results.filter(p => p.name.startsWith(search))
    }
    if (limit) {
        results = results.slice(0, Number(limit))
    }

    if (results.length < 1) {
        return res.status(200).json({ success: true, data: [] })
    }
    res.status(200).json(results)
})
```

### Key Points

- `req.query` is an **object** of all `?key=value` pairs from the URL.
- Query values are always **strings**.
- Queries are **optional** — if not provided, `req.query.key` is `undefined`.
- Useful for **filtering**, **searching**, **sorting**, and **pagination**.

### Route Params vs Query Strings

| Feature | Route Params | Query Strings |
|---------|-------------|---------------|
| Syntax | `/products/:id` | `/products?id=1` |
| Access | `req.params` | `req.query` |
| Required? | Yes (part of the route) | No (optional) |
| Use case | Identify a **specific resource** | **Filter / search / sort** a collection |

**Files:** `07-params-query-1.js`, `app.js`

---

## Summary Table

| # | Topic | Key Takeaway |
|---|-------|-------------|
| 1 | HTTP Basics | Raw HTTP requires manual routing, headers, and content-types |
| 2 | HTTP App | Serving multi-file apps with raw HTTP doesn't scale |
| 3 | Express Basics | `app.get()`, `res.send()`, `app.all('*')` for 404 |
| 4 | Static + sendFile | `express.static()` for asset folders, `res.sendFile()` for specific files |
| 5 | Fully Static | Put `index.html` in public folder → instant static site |
| 6 | JSON APIs | `res.json()` for APIs, separate data into modules |
| 7 | Route Params | `req.params` — dynamic URL segments (`:id`) |
| 8 | Query Strings | `req.query` — optional `?key=value` for filtering/search |
