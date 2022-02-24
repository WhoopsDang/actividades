const fs = require('fs')

let s = fs.readFileSync(process.argv[2], 'utf8')
let a = s.split('\n')

console.log(a.length - 1)