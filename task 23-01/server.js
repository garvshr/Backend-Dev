const http = require('http')

http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`)
    if (url.pathname === '/secure') {
        const user = url.searchParams.get('user')
        const key = url.searchParams.get('key')
        if (user === 'admin' && key === 'secret') {
            res.writeHead(200, { 'Content-Type': 'text/plain' })
            res.end('Welcome to the Vault')
        } else {
            res.writeHead(401, { 'Content-Type': 'text/plain' })
            res.end('Access Denied')
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end('Not Found')
    }
}).listen(8000)

