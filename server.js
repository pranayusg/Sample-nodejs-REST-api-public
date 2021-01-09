const http=require('http')
const app=require('./app')

//http://localhost:3000/api-docs/#/

const port= process.env.PORT || 3000;
const server =http.createServer(app);

server.listen(port,() => console.log('lisening at '+port))

