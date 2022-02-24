const EventEmitter = require('events');
const fs = require('fs');
const uuid = require('uuid');

//let arr = []
//let json = {}

class Logger extends EventEmitter {
  log(msg) {
    // Call event
    this.emit('message', { id: uuid.v4(), msg });
  }
}

const logger = new Logger();


logger.on('message', data => {
    //console.log('Called Listener', data)
    fs.stat(path.join(__dirname, '/data', 'logs.json'), function(err, stat){
      console.log('exists')

      //read
      const logs = JSON.parse(fs.readFileSync(path.join(__dirname, '/data', 'logs.json')))
      logs.push(data)

      //display
      logs.forEach(function(log){
        if(err) throw err
        console.log(log.msg)
      })

      //write and update
      fs.writeFileSync(path.join(__dirname, '/data', 'logs.json')), JSON.stringify(logs), function(err){
        
      }
    })
});




logger.log('Hello World');
logger.log('Hi');
logger.log('Hello');

// arr.forEach(data =>{
//     json
// })