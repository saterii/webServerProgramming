const os = require("os")

let uptime = os.uptime()
let memory = os.totalmem()

console.log(`System uptime is ${uptime} seconds.`)
console.log(`The total memory in the system is ${memory} bytes.`)