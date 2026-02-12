# Node.js & Express.js — Learning Lab 🧪

> A hands-on repository documenting my journey through **Node.js** and **Express.js** fundamentals.
> Every file is a working example — read the code, run it, and learn.

---

## 🎯 What This Repo Is

I'm currently working through the **freeCodeCamp Node.js & Express.js Full Course** by [John Smilga](https://github.com/john-smilga/node-express-course) — this repo is my personal code-along, annotated with comments and organized topic-by-topic.

Once I complete the course, I'll be building **real projects** using everything I learn here.

> ⚠️ **Disclaimer** — Code closely follows the tutorial (~90%). This is for **educational purposes only**. All credit for course content goes to **John Smilga / freeCodeCamp.org**.

---

## 📂 Project Structure

```
node-express/
│
├── 1-node/                          ← Node.js fundamentals
│   ├── 01-intro.js                  # First Node script, template literals
│   ├── 02-globals.js                # Node globals (__dirname, __filename, process, etc.)
│   ├── 03-modules.js                # CommonJS require/exports
│   ├── 03-data-names.js             # Module with named exports
│   ├── 03-utils-demo.js             # Module exporting a utility function
│   ├── 04-alt_module.js             # Alternative module.exports pattern
│   ├── 04-data-alt.js               # Exporting with module.exports.property
│   ├── 05-mindgrenade.js            # Require side-effects (code runs on import)
│   ├── 05-utils-mindgrenade.js      # Module demonstrating side-effect execution
│   ├── 06-os-module.js              # OS module — user info, uptime, memory, CPUs
│   ├── 07-path-module.js            # Path module — sep, join, basename, resolve
│   ├── 08-fs-sync.js                # File system — synchronous read & write
│   ├── 09-fs-async.js               # File system — async with callbacks
│   ├── 10-sync-vs-async.js          # Side-by-side sync vs async comparison
│   ├── 11-http.js                   # Raw HTTP server with url routing
│   ├── 12-npm-demo.js               # npm, package.json, lodash, devDependencies
│   ├── 13-event-loop.js             # Event loop — setTimeout, setInterval, server
│   ├── 14-async-patterns.js         # Promises, async/await, fs.promises
│   ├── 15-events-demo.js            # EventEmitter — custom events, HTTP events
│   ├── 16-create-big-file.js        # Generate a large test file
│   ├── 16-streams-demo.js           # Streams — readStream, pipe, HTTP streaming
│   ├── app.js                       # Main entry (streams + HTTP demo)
│   ├── content/                     # Text files used in fs demos
│   ├── INSIGHTS.md                  # ← Topic-wise quick-reference cheat sheet
│   └── package.json
│
├── 2-express/                       ← Express.js basics
│   ├── 01-http-basics.js            # Raw HTTP — writeHead, content-type, routing
│   ├── 02-http-app.js               # Serving full HTML app with raw HTTP
│   ├── 03.express-basics.js         # Express hello world — app.get, app.all
│   ├── 04-express-app.js            # Serving files with express.static + sendFile
│   ├── 05-all-static.js             # Fully static server using express.static
│   ├── 06.basic-json.js             # Sending JSON responses (res.json)
│   ├── 07-params-query-1.js         # Route params & query strings
│   ├── app.js                       # Main entry (params + query demo)
│   ├── data.js                      # Sample products & people data
│   ├── navbar-app/                  # Static HTML/CSS navbar app
│   ├── public/                      # Static assets served by Express
│   ├── INSIGHTS.md                  # ← Topic-wise quick-reference cheat sheet
│   └── package.json
│
├── README.md                        ← You are here
└── .gitignore
```

---

## 🧠 Topics Covered

### `1-node/` — Node.js Core

| # | Topic | File(s) |
|---|-------|---------|
| 01 | Running your first Node script | `01-intro.js` |
| 02 | Node globals (`__dirname`, `__filename`, `require`, `module`, `process`) | `02-globals.js` |
| 03 | CommonJS modules — `require` & `module.exports` | `03-modules.js`, `03-data-names.js`, `03-utils-demo.js` |
| 04 | Alternative `module.exports` patterns | `04-alt_module.js`, `04-data-alt.js` |
| 05 | Mind grenade — `require()` runs code on import | `05-mindgrenade.js`, `05-utils-mindgrenade.js` |
| 06 | `os` module — user info, uptime, memory, CPU | `06-os-module.js` |
| 07 | `path` module — sep, join, basename, resolve | `07-path-module.js` |
| 08 | `fs` module — synchronous read & write | `08-fs-sync.js` |
| 09 | `fs` module — asynchronous read & write (callbacks) | `09-fs-async.js` |
| 10 | Sync vs async — execution order comparison | `10-sync-vs-async.js` |
| 11 | `http` module — creating a basic server | `11-http.js` |
| 12 | npm — packages, `package.json`, lodash, devDependencies, npx | `12-npm-demo.js` |
| 13 | Event loop — `setTimeout`, `setInterval`, server lifecycle | `13-event-loop.js` |
| 14 | Async patterns — Promises, async/await, `fs.promises`, `util.promisify` | `14-async-patterns.js` |
| 15 | Events — `EventEmitter`, custom events, HTTP events | `15-events-demo.js` |
| 16 | Streams — `createReadStream`, `pipe`, HTTP streaming | `16-streams-demo.js`, `16-create-big-file.js` |

### `2-express/` — Express.js

| # | Topic | File(s) |
|---|-------|---------|
| 01 | HTTP basics recap — `writeHead`, status codes, `content-type` | `01-http-basics.js` |
| 02 | Serving a full HTML app with raw `http` module | `02-http-app.js` |
| 03 | Express basics — `app.get()`, `app.all()`, `res.send()` | `03.express-basics.js` |
| 04 | Serving HTML files — `express.static()`, `res.sendFile()` | `04-express-app.js` |
| 05 | Fully static server with `express.static()` | `05-all-static.js` |
| 06 | JSON responses — `res.json()` with data module | `06.basic-json.js` |
| 07 | Route params & query strings — `req.params`, `req.query`, filtering | `07-params-query-1.js` |

---

## ⚙️ Getting Started

```bash
# Clone
git clone https://github.com/Code-X-Slayer/node-express.git
cd node-express

# --- Node section ---
cd 1-node
npm install
node 01-intro.js          # Run any individual file
npm start                 # Runs app.js

# --- Express section ---
cd ../2-express
npm install
npm start                 # Runs app.js with nodemon
```

---

## 📦 Dependencies

| Package | Where | Purpose |
|---------|-------|---------|
| **lodash** | `1-node` | Utility demo (`_.flattenDeep`) |
| **bootstrap** | `1-node` | Installed as npm exercise (not actively used) |
| **nodemon** | both | Auto-restart on file changes (dev dependency) |
| **express** | `2-express` | Web framework |

---

## 🗺️ Roadmap

- [x] Node.js fundamentals (globals, modules, core modules)
- [x] File system operations (sync & async)
- [x] HTTP servers from scratch
- [x] Event loop, async patterns, streams
- [x] Express basics, static files, JSON APIs
- [x] Route params & query strings
- [ ] Middleware
- [ ] POST / PUT / DELETE routes
- [ ] Express Router
- [ ] Error handling
- [ ] MongoDB integration
- [ ] Authentication & authorization
- [ ] **Build real projects** after completing the course

---

## 📝 Quick-Reference Sheets

Each section has its own `INSIGHTS.md` — a clean, topic-wise cheat sheet you can use for **quick revision**:

- [`1-node/INSIGHTS.md`](./1-node/INSIGHTS.md) — Node.js core concepts
- [`2-express/INSIGHTS.md`](./2-express/INSIGHTS.md) — Express.js concepts

---

## 🎓 Credits

**Course:** [Node.js and Express.js – Full Course](https://www.youtube.com/watch?v=Oe421EPjeBE) (freeCodeCamp)
**Instructor:** [John Smilga](https://github.com/john-smilga) (Coding Addict)

---

## 📜 License

Educational use only. Original course content © John Smilga / freeCodeCamp.org.