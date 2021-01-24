const io = require("socket.io-client");
const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin,  output: process.stdout });
rl.question("What is your name? ", answer => {
  const socket = io('http://localhost:3000');   
  const messagePrompt = () => {
    rl.question(">", msg => {
    console.log(`Sending message: "${msg}"`)
    let ms = `${answer} says "${msg}"`
    socket.emit('simple chat message',ms);
    messagePrompt();
    
  })}
  socket.on("connect", () => {
    console.log("Sucessfully Connected to server");
    messagePrompt();
  });
  socket.on("simple chat message", msg => console.log(msg))
  socket.on("disconnect", () => console.log("Connection Lost.")) 
});
