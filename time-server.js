const net = require('net')
let date = new Date()


const server = net.createServer(function (socket){
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  if(month < 10){
    month = '0' + (date.getMonth()+1)
  }
  let day = date.getDay() + 6
  if(day < 10){
    day = '0' + (date.getDay() +6)
  }
  let hr = date.getHours()
  let min = date.getMinutes()
  let dateF = year + '-' + month + '-' + day + ' ' + hr + ':' + min

  
  socket.end(dateF + '\n')
})

server.listen(Number(process.argv[2]))
