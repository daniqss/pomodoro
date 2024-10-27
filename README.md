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
```bash
docker build -f server/Dockerfile -t pomodoro-server .
# docker build -f client/Dockerfile -t pomodoro-client .
docker run -d -p 3000:3000 pomodoro-server
# docker run -d -p 5173:80 pomodoro-client
```
