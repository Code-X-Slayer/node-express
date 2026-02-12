# Node.js — Quick-Reference Cheat Sheet

> Every concept covered in this folder, organized topic-by-topic.
> Use this as a **revision sheet** — one look and you're back up to speed.

---

## 1 · Running Node.js

```bash
node filename.js        # Run any single file
npm start               # Runs the "start" script from package.json
npm run dev             # Runs the "dev" script (nodemon)
```

- Node executes JavaScript **outside the browser** using the V8 engine.
- There is **no `window`** or `document` object — those are browser-only.
- You can use `console.log()`, template literals, and all standard JS.

**File:** `01-intro.js`

---

## 2 · Node Globals

Node provides its own set of **global variables** (not the browser's `window`):

| Global | What It Gives You | Example |
|--------|------------------|---------|
| `__dirname` | Absolute path to the **directory** of the current file | `/home/user/project` |
| `__filename` | Absolute path to the **file itself** | `/home/user/project/app.js` |
| `require` | Function to **import modules** (CommonJS) | `const fs = require('fs')` |
| `module` | Object describing the **current module** — id, exports, parent, etc. | `console.log(module)` |
| `process` | Object with **environment info** — pid, argv, env, cwd, etc. | `process.env.NODE_ENV` |

- `setInterval` and `setTimeout` are also globals.

**File:** `02-globals.js`

---

## 3 · CommonJS Modules

Every file in Node is a **module**. Code is encapsulated by default — nothing leaks out unless you explicitly export it.

### Exporting

```js
// Method 1 — assign an object to module.exports
const john = "john"
const secret = "secret"          // stays private
module.exports = { john }        // only john is shared
```

```js
// Method 2 — attach properties directly
module.exports.items = ['a', 'b']
module.exports.person = { name: "bob" }
```

### Importing

```js
const data = require('./myModule')   // imports whatever module.exports is
data.john                            // access exported values
```

### Key Rules

- `module.exports` is the **single object** returned by `require()`.
- Variables **not** on `module.exports` remain **private** to the file.
- `require()` **caches** the module — it runs only once, subsequent calls return the cached exports.
- If a module has executable code (not just exports), that code **runs immediately** when `require()`d (the "mind grenade" pattern).

**Files:** `03-modules.js`, `03-data-names.js`, `03-utils-demo.js`, `04-alt_module.js`, `04-data-alt.js`, `05-mindgrenade.js`, `05-utils-mindgrenade.js`

---

## 4 · `os` Module (Built-in)

```js
const os = require('os')
```

| Method | Returns |
|--------|---------|
| `os.userInfo()` | Current user — username, uid, gid, shell, homedir |
| `os.uptime()` | System uptime in **seconds** |
| `os.type()` | OS type (`Windows_NT`, `Linux`, `Darwin`) |
| `os.release()` | OS version string |
| `os.totalmem()` | Total RAM in **bytes** |
| `os.freemem()` | Free RAM in **bytes** |
| `os.cpus()` | Array of CPU core objects → `.length` gives core count |

**Tip:** Divide bytes by `1024` → KB, by `1024²` → MB, by `1024³` → GB.

**File:** `06-os-module.js`

---

## 5 · `path` Module (Built-in)

```js
const path = require('path')
```

| Method | What It Does | Example Output |
|--------|-------------|----------------|
| `path.sep` | Platform-specific separator | `\` (Windows) or `/` (Unix) |
| `path.join(a, b, c)` | Join path segments | `content\subfolder\test.txt` |
| `path.basename(filePath)` | Extract the **file name** from a path | `test.txt` |
| `path.resolve(dir, ...)` | Build an **absolute path** | `C:\Users\...\content\test.txt` |

**Why use it?** Paths behave differently on Windows vs Linux. `path` handles slashes for you.

**File:** `07-path-module.js`

---

## 6 · `fs` Module — File System (Built-in)

### Synchronous (Blocking)

```js
const { readFileSync, writeFileSync } = require('fs')

const data = readFileSync('./file.txt', 'utf-8')    // returns string
writeFileSync('./out.txt', 'Hello')                  // create / overwrite
writeFileSync('./out.txt', '\nMore', { flag: 'a' })  // append
```

- **Blocks** the thread until the operation completes.
- Good for scripts, bad for servers.

### Asynchronous (Non-Blocking)

```js
const { readFile, writeFile } = require('fs')

readFile('./file.txt', 'utf-8', (err, result) => {
    if (err) { console.log(err); return }
    console.log(result)
})
```

- Uses **callbacks** — does not block the event loop.
- Nesting callbacks → **callback hell** (hard to read, error-prone).

### `{ flag: 'a' }` — Append Mode

Pass `{ flag: 'a' }` as the options argument to **append** instead of overwrite.

### Sync vs Async — Execution Order

```
SYNC:  start → read → write → done → next task
ASYNC: start → next task → (later) read callback → write callback → done
```

Async code **does not wait** — "next task" runs before the file is done reading.

**Files:** `08-fs-sync.js`, `09-fs-async.js`, `10-sync-vs-async.js`

---

## 7 · `http` Module — Creating Servers (Built-in)

```js
const http = require('http')

const server = http.createServer((req, res) => {
    if (req.url === '/')     return res.end('Home')
    if (req.url === '/about') return res.end('About')
    res.end('<h1>404</h1>')
})

server.listen(5000)
```

| Property / Method | What It Is |
|-------------------|-----------|
| `req.url` | The requested URL path (`/`, `/about`, etc.) |
| `req.method` | HTTP method (`GET`, `POST`, etc.) |
| `res.writeHead(status, headers)` | Set status code and response headers |
| `res.write(data)` | Write data to response body |
| `res.end(data?)` | End the response (optionally with final data) |

- The server **stays alive** listening for requests until you kill it (`Ctrl+C`).
- Every incoming request triggers the callback — you manually route using `req.url`.

**File:** `11-http.js`

---

## 8 · npm — Package Management

### Core Commands

| Command | What It Does |
|---------|-------------|
| `npm init -y` | Create `package.json` with defaults |
| `npm i <pkg>` | Install a **production** dependency |
| `npm i <pkg> -D` | Install a **dev** dependency |
| `npm i -g <pkg>` | Install **globally** |
| `npm uninstall <pkg>` | Remove a package |
| `npm install` | Install all dependencies from `package.json` |

### Key Files

| File | Purpose |
|------|---------|
| `package.json` | Project manifest — name, version, scripts, dependencies |
| `package-lock.json` | Locks **exact** dependency versions for reproducibility |
| `node_modules/` | Actual installed packages — **never commit to git** |

### Scripts

```json
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js"
}
```

- `npm start` → runs the `start` script (no `run` needed).
- `npm run dev` → runs the `dev` script.

### Dev Dependencies

Packages needed **only during development** (e.g., `nodemon`):

```bash
npm i nodemon -D           # or --save-dev
```

### Sharing Code

- **Don't push** `node_modules` → add it to `.gitignore`.
- Others clone and run `npm install` to restore everything.

### npx

- Runs packages **without global install** — avoids polluting global scope.
- Use case: `npx create-react-app my-app`.

**File:** `12-npm-demo.js`

---

## 9 · Event Loop

Node.js is **single-threaded** but handles concurrency through the **event loop**:

1. Synchronous code runs **first** (call stack).
2. Async callbacks (`setTimeout`, `readFile`, etc.) are **offloaded** and executed **later** when the call stack is empty.

### Key Patterns

```js
// setTimeout — runs callback ONCE after delay
setTimeout(() => console.log('delayed'), 0)
// Even with 0ms delay, runs AFTER synchronous code

// setInterval — runs callback REPEATEDLY
setInterval(() => console.log('tick'), 2000)
// Process stays alive until killed
```

### What Keeps Node Running?

- `setInterval` / recurring timers
- Active HTTP server (`server.listen`)
- Open event listeners

Without any of these, the process **exits automatically**.

**File:** `13-event-loop.js`

---

## 10 · Async Patterns

### Pattern 1 — Callbacks (Original)

```js
readFile('./file.txt', 'utf-8', (err, data) => {
    if (err) return console.log(err)
    console.log(data)
})
```

Nesting callbacks → **callback hell**.

### Pattern 2 — Wrapping Callbacks in Promises

```js
const getText = (path) => {
    return new Promise((resolve, reject) => {
        readFile(path, 'utf-8', (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

getText('./file.txt')
    .then(result => console.log(result))
    .catch(err => console.log(err))
```

### Pattern 3 — async / await

```js
const start = async () => {
    try {
        const first = await getText('./content/first.txt')
        const second = await getText('./content/second.txt')
        console.log(first, second)
    } catch (err) {
        console.log(err)
    }
}
```

✅ Reads like synchronous code — **cleaner**, easier to debug.

### Pattern 4 — `fs.promises` (Best Practice)

```js
const { readFile, writeFile } = require('fs').promises

const start = async () => {
    const data = await readFile('./file.txt', 'utf-8')
    await writeFile('./out.txt', data)
}
```

- **No manual wrapping** needed.
- Official Node.js API — use this in modern codebases.

### `util.promisify`

```js
const util = require('util')
const readFilePromise = util.promisify(readFile)
```

- Converts any callback-based function into a Promise-based one.
- Less needed now with `fs.promises`, but useful for other callback APIs.

### Blocking Code Warning ⚠️

```js
// BAD — blocks the entire event loop
for (let i = 0; i < 200; i++) {
    for (let j = 0; j < 400; j++) { /* heavy work */ }
}
```

- Since Node is **single-threaded**, CPU-heavy sync code blocks **all** requests.
- Always offload heavy work or use async approaches.

**File:** `14-async-patterns.js`

---

## 11 · Events — EventEmitter

```js
const EventEmitter = require('events')
const emitter = new EventEmitter()
```

### Basic Usage

```js
// 1. Register a listener
emitter.on('greet', () => console.log('Hello!'))

// 2. Emit the event
emitter.emit('greet')    // → "Hello!"
```

### Passing Data With Events

```js
emitter.on('response', (name, id) => {
    console.log(`Name: ${name}, ID: ${id}`)
})

emitter.emit('response', 'vijay', 101)
```

### Order Matters

`on()` must be registered **before** `emit()` — otherwise the listener misses the event.

### HTTP Server Uses EventEmitter

```js
const http = require('http')
const server = http.createServer()

server.on('request', (req, res) => {
    res.end('Hello')
})

server.listen(5000)
```

Under the hood: `http.Server` → extends `net.Server` → extends `EventEmitter`.

**File:** `15-events-demo.js`

---

## 12 · Streams

Streams process data **chunk by chunk** instead of loading the entire file into memory.

### Four Types

| Type | Description |
|------|-------------|
| **Readable** | Read data from a source |
| **Writeable** | Write data to a destination |
| **Duplex** | Both read and write |
| **Transform** | Modify data as it passes through |

### Creating a Read Stream

```js
const { createReadStream } = require('fs')

const stream = createReadStream('./big.txt', {
    highWaterMark: 9 * 1024,    // chunk size (default: 64KB)
    encoding: 'utf-8'
})

stream.on('data', (chunk) => console.log(chunk))
stream.on('error', (err) => console.log(err))
```

- Default chunk size is **64KB**.
- `highWaterMark` controls the chunk size (in bytes).
- Last chunk may be smaller (the remainder).

### Piping Streams to HTTP Response

```js
// ❌ BAD — loads entire file into memory
const text = fs.readFileSync('./big.txt', 'utf-8')
res.end(text)

// ✅ GOOD — streams chunk by chunk
const fileStream = fs.createReadStream('./big.txt', 'utf-8')
fileStream.on('open', () => fileStream.pipe(res))
fileStream.on('error', (err) => res.end(err))
```

`.pipe()` connects a readable stream to a writable stream — data flows automatically.

**Why streams?** For large files, loading everything into memory crashes or slows the server. Streams keep memory usage constant.

**Files:** `16-create-big-file.js`, `16-streams-demo.js`

---

## Summary Table

| # | Topic | Key Takeaway |
|---|-------|-------------|
| 1 | Node Basics | JS runtime outside the browser, no `window`/`document` |
| 2 | Globals | `__dirname`, `__filename`, `require`, `module`, `process` |
| 3 | Modules | `module.exports` + `require()` = encapsulated code sharing |
| 4 | OS Module | System info — user, memory, CPU, uptime |
| 5 | Path Module | Cross-platform path manipulation |
| 6 | FS Module | Read/write files — sync (blocking) vs async (non-blocking) |
| 7 | HTTP Module | Create servers, route by `req.url`, respond with `res.end()` |
| 8 | npm | Package management, `package.json`, dev deps, scripts |
| 9 | Event Loop | Single-threaded async — sync first, callbacks later |
| 10 | Async Patterns | Callbacks → Promises → async/await → `fs.promises` |
| 11 | Events | `EventEmitter` — `.on()` to listen, `.emit()` to fire |
| 12 | Streams | Chunk-by-chunk processing, `.pipe()`, memory-efficient |