const http = require('http')
const fs = require('fs')

http.createServer((req, res) => {
    const timestamp = new Date().toLocale.String()
    const log = `[${timestamp}] | Method: ${req.method} | URL: ${req.url}\n`
    fs.appendFile('access.log', log, () => { })
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Request Logged Successfully!')
}).listen(5000)
