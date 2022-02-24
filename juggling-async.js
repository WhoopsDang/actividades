let http = require('http')
let r = ['', '', '']
let count = 0

function print(data, i){
  r[i] += data
  count++

  if(count == 3){
    r.forEach(function(e){
      console.log(e)
    })
  }
}

for(let i = 0; i < 3; i++){
  http.get(process.argv[2 + i], function(response){
    response.setEncoding('utf8')
    let string = ''
    response.on('data', function(data){
      string+= data

    })

    response.on('end', function(){
      print(string, i)
    })

  })

}

