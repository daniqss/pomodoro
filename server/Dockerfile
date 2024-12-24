FROM node:22
RUN npm install -g pnpm

WORKDIR /pomodoro
COPY . .

RUN pnpm install --filter ./server...

WORKDIR /pomodoro/server
RUN pnpm build

ENV NODE_ENV=production
ENV HOST_ADDRESS=server
ENV PORT=3000
EXPOSE 3000
CMD ["pnpm", "start"]
