const app = require('./app')
const qrcode = require('qrcode-terminal')
const {Client} = require('whatsapp-web.js')




const port = 5000


app.listen(port, () => console.log('Running Express'))


// const number = "+52"

// const message = "Happy Birthday"


// const client = new Client()
// client.on('qr', qr =>{
//     qrcode.generate(qr, {small: true})
    
// })
// client.on('ready', () =>{
//     console.log('Sending message')
//     const chatId = number.substring(1) + "@c.us"
//     client.sendMessage(chatId, message)
// })
// client.initialize()




