// npm - global command comes with node
// npm --version

// local dependency - use it only int this particluar project (prefered)
// npm i <packageName>

// global dependency - use it any project
// npm install -g <packageName>
// sudo npm install -g <packageName> (mac)

// package.json - manifest file (stores important info about project/package)
// manual approach (create package.json in the root, create properties etc)
// npm init (step by step, press enter to skip)
// npm init -y (everything deafult)

const _ = require('lodash')

const items = [1, [2, [3, [4]]]]
const newItems = _.flattenDeep(items);
console.log(newItems)
console.log("testing...")

// share code
// while uploading to git we dont push node_modules because of huge memory
// instead they will be get using command `npm install` based on package.json and package-lock.json
// so when dev cloned repo to run they will npm install first and get all corresponding node_modules in one go

// unistalling dependencies
// safe small uninstalls
// npm uninstall <packageName>
// when so many uninstalls required we rm -r node_modules
// remove those packages from package.json manually and npm install to create fresh

// dev dependecies
// dependencies like nodemon which is not necessary for project running
// but used for project developers during development purpose never used in production
// those to install packages under this dev dependency category
// npm i <packageName> -D
// npm i <packageName> --save-dev
// inside package.json you can observe new category created other than dependencies
//   "devDependencies": {
//     "nodemon": "^3.1.11"
//   }
// to make use of these packages we will do something like updating pakcage.json scripts as follows
//   "scripts": {
//     "start": "node app.js",
//     "dev": "nodemon app.js"
//   },
// so instead manual node app.js everytime we simply npm start or npm run start to start our app
// simillarly to run in dev mode we use npm run dev

// global installation of packages
// some like react gastby we need some global installations which may pollute or global space and lead to bugs
// npx (package runner introduced in npm 5.2) is introduced (we learn later during in further tut of this course)
// npx resolves this issue of running those without global installations