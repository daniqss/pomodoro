import express from 'express';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import logger from 'morgan';
const port = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server);
  
app.use(logger('dev'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

io.on('connection', socket => {
    console.log('A user connected!');    
})

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
