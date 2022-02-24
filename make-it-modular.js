const filter = require('./mymodule')

filter(process.argv[2], process.argv[3], (err, data)=> {
  if(err) console.log(err)

  data.forEach(item=>{
    console.log(item)
  })

})