# Node.js Learning Insights

This document summarizes **key insights** from all Node.js scripts in this repo. It’s meant as a **quick reference** for Node.js concepts, modules, async patterns, npm, and common utilities.

---

## 1. Node.js Basics & Globals

Node.js does not have `window` or `document`. Instead, it provides **Node-specific globals**:

| Global       | Description                | Example                    |
| ------------ | -------------------------- | -------------------------- |
| `__dirname`  | Path to current directory  | `console.log(__dirname)`   |
| `__filename` | Full path of current file  | `console.log(__filename)`  |
| `require`    | Import modules (CommonJS)  | `const fs = require('fs')` |
| `module`     | Info about current module  | `console.log(module)`      |
| `process`    | Environment info & control | `console.log(process.env)` |

**Module Export / Import (CommonJS)**

```js
// utils.js
const sayHi = name => console.log(`Hello ${name}`)
module.exports = { sayHi }

// app.js
const utils = require('./utils')
utils.sayHi('John')
```

---

## 2. Conditional Statements & Template Literals

```js
const amount = 9
if (amount < 10) console.log("small")
else console.log("large")

console.log(`Hey, this is my first Node app!`)
```

---

## 3. OS Module

Provides system-related information.

| Method          | Description              | Example                         |
| --------------- | ------------------------ | ------------------------------- |
| `os.userInfo()` | Current user info        | `console.log(os.userInfo())`    |
| `os.uptime()`   | System uptime in seconds | `console.log(os.uptime())`      |
| `os.type()`     | OS type                  | `console.log(os.type())`        |
| `os.release()`  | OS version               | `console.log(os.release())`     |
| `os.totalmem()` | Total memory in bytes    | `console.log(os.totalmem())`    |
| `os.freemem()`  | Free memory in bytes     | `console.log(os.freemem())`     |
| `os.cpus()`     | Number of CPU cores      | `console.log(os.cpus().length)` |

---

## 4. Path Module

Handles file paths in a cross-platform way.

| Method            | Description    | Example                                                    |
| ----------------- | -------------- | ---------------------------------------------------------- |
| `path.sep`        | Path separator | `path.sep // '\' on Windows`                               |
| `path.join()`     | Join paths     | `path.join('content','subfolder','file.txt')`              |
| `path.basename()` | Get file name  | `path.basename(filePath)`                                  |
| `path.resolve()`  | Absolute path  | `path.resolve(__dirname,'content','subfolder','file.txt')` |

---

## 5. FS Module (File System)

Node provides **sync and async file operations**.

### Synchronous Methods

| Method                               | Description | Example                                                |
| ------------------------------------ | ----------- | ------------------------------------------------------ |
| `readFileSync(path, encoding)`       | Read file   | `readFileSync('./content/first.txt', 'utf-8')`         |
| `writeFileSync(path, data, options)` | Write file  | `writeFileSync('./content/result.txt', 'Hello World')` |

```js
const { readFileSync, writeFileSync } = require('fs')
const first = readFileSync('./content/first.txt', 'utf-8')
writeFileSync('./content/result_sync.txt', `Result: ${first}`)
```

### Asynchronous Methods

| Method                               | Description               | Example                                                   |
| ------------------------------------ | ------------------------- | --------------------------------------------------------- |
| `readFile(path, encoding, callback)` | Read file asynchronously  | `readFile('./content/first.txt','utf-8',(err,res)=>{})`   |
| `writeFile(path, data, callback)`    | Write file asynchronously | `writeFile('./content/result_async.txt', 'Data', ()=>{})` |

**Async Notes:**

* Async operations do **not block** the event loop.
* Use callbacks or Promises to handle results.
* Beware of **callback hell** with nested callbacks.

---

## 6. HTTP Module

Create servers and handle requests.

```js
const http = require('http')
const server = http.createServer((req, res) => {
    if(req.url === '/') res.end('Home Page')
    else if(req.url === '/about') res.end('About Page')
    else res.end('404 Not Found')
})
server.listen(5000)
```

**Key Insight:** Node servers are **event-driven** and respond asynchronously.

---

## 7. Async Patterns

| Concept       | Description          | Example                                    |
| ------------- | -------------------- | ------------------------------------------ |
| `setTimeout`  | Delay execution once | `setTimeout(()=>console.log("Hi"), 2000)`  |
| `setInterval` | Repeat execution     | `setInterval(()=>console.log("Hi"), 2000)` |
| Event Loop    | Handles async tasks  | `readFile, server requests, timers`        |

* `setInterval` and server processes **keep Node running** until manually stopped.

---

## 8. npm & Package Management

* Check npm version:

```bash
npm --version
```

* **Local dependency** – project-specific:

```bash
npm i <packageName>
```

* **Global dependency** – usable anywhere:

```bash
npm install -g <packageName>
sudo npm install -g <packageName> # macOS
```

* **Dev dependency** – used during development only:

```bash
npm i <packageName> -D
npm i <packageName> --save-dev
```

* **Uninstall packages**:

```bash
npm uninstall <packageName>
# For full cleanup:
rm -r node_modules
# Remove package references in package.json, then:
npm install
```

* **package.json** – project manifest, contains scripts, dependencies.
* **package-lock.json** – exact version tree for reproducibility.

**Example scripts in package.json:**

```json
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js"
}
```

**Key Notes:**

* `npm start` → runs production start script.

* `npm run dev` → runs development script with dev dependencies.

* Avoid polluting global space; use `npx` to run packages without global install.

* **Git and node_modules:** Do not push `node_modules`.
  Developers should run `npm install` to fetch packages locally.

---

## 9. Lodash Utility

Flatten nested arrays:

```js
const _ = require('lodash')
const items = [1,[2,[3,[4]]]]
const flatItems = _.flattenDeep(items)
console.log(flatItems) // [1,2,3,4]
```

---

## 10. Modules & Exports

* Every file is a **module**.
* Export **only what’s needed** for encapsulation.
* Example:

```js
// 03-utils-demo.js
const sayHi = name => console.log(`Hello ${name}`)
module.exports = { sayHi }

// 03-data-names.js
const john = "john", peter = "peter", susan = "susan"
module.exports = { john, peter, susan }
```

---

## 11. Advanced Async Patterns & Performance Considerations

This section focuses on **real-world async behavior in Node.js**, highlighting how blocking code affects performance and how to properly handle asynchronous file operations using **Promises** and **async/await**.

---

### 🚫 Blocking vs Non-Blocking Code

Node.js runs on a **single-threaded event loop**.
CPU-intensive or synchronous code can **block the event loop**, preventing other requests from being handled.

**Key takeaway:**

* Avoid heavy synchronous loops inside request handlers.
* Blocking code delays **all incoming requests**, even for different routes.

```js
// Blocking loop inside a route (bad practice)
for (let i = 0; i < 200; i++) {
  for (let j = 0; j < 400; j++) {}
}
```

✔️ Always offload heavy tasks or use async approaches when possible.

---

### 🤝 Creating Promises Manually

Before native promise APIs, callbacks were commonly wrapped inside Promises to improve readability and control.

```js
const { readFile } = require('fs')

const getText = (path) =>
  new Promise((resolve, reject) => {
    readFile(path, 'utf-8', (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
```

This pattern helps avoid **callback nesting** and enables `async/await`.

---

### ✨ Async / Await Refactor

Using `async/await` makes asynchronous code look **synchronous and easier to reason about**, while remaining non-blocking.

```js
const start = async () => {
  try {
    const first = await getText('./content/first.txt')
    const second = await getText('./content/second.txt')
    console.log(first, second)
  } catch (err) {
    console.error(err)
  }
}
```

✔️ Cleaner
✔️ Easier error handling
✔️ More maintainable

---

### 🧩 Native Promise-Based FS API

Node.js provides a **built-in Promise API** for `fs`, eliminating the need for manual wrapping or `util.promisify`.

```js
const { readFile, writeFile } = require('fs').promises

const start = async () => {
  const first = await readFile('./content/first.txt', 'utf-8')
  const second = await readFile('./content/second.txt', 'utf-8')

  await writeFile(
    './content/result-mind-grenade.txt',
    `${first}\n${second}`
  )
}
```

**Why this matters:**

* Less boilerplate
* Official Node.js API
* Best practice for modern Node apps

---

### 🧠 Key Learnings

* Blocking code directly impacts server responsiveness
* Promises simplify async flow control
* `async/await` improves readability and debugging
* Prefer `fs.promises` over callbacks or manual promisification

---

✅ **Summary**

* Node.js is **event-driven, single-threaded, and asynchronous**
* Core modules: **fs, path, os, http**
* Package management: **npm**, `package.json`, `package-lock.json`
* Modules: Use CommonJS (`require` / `module.exports`)
* Async patterns: `setTimeout`, `setInterval`, callbacks
* Servers and intervals keep Node running until killed

---