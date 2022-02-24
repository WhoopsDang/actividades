const http = require('http')
const map = require("through2-map")

let server = http.createServer(function(req, res){
  if (req.method === 'POST'){
    res.writeHead(200, {'Content-Type': 'text/plain'})

    req.pipe(map(function (chunk) {
      // convert request to uppercase string
      return chunk.toString().toUpperCase()
      // stream result to response with pipe()
    })).pipe(res)
  }
})
server.listen(process.argv[2])