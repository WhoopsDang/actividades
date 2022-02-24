const fs = require('fs')
const path = require('path')

function filter(dir, ext, callback){
  let d = fs.readdir(dir, (err, files)=>{
    if (err){
      return callback(err)
    }

    const data = files.filter(file => path.extname(file) === '.' + ext)
    callback(err, data)
  })

}

module.exports = filter