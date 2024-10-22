# Pomodoro!
A simple pomodoro to stay focus in company, powered by [SocketIO](https://socket.io/). It uses React and TailwindCSS in the client and NodeJS and Express in the server, in addition to SocketIO to handle bidirectional and low-latency communication 

![](./assets/photo_1.png)

## How to run
### Development
Web client will run on port 5173 and server on 3000
```bash
cd client && npm install && npm run dev
cd ../server && npm install && npm run dev 
```

### Production
It will be running be default on port 3000, and it can be set with the environment variable PORT.
Client build will be served by the server as static files.
```bash
npm run build
npm run start
```

