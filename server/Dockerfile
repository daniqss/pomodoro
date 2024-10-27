FROM node:22

WORKDIR /pomodoro/server
COPY server .
COPY types ../types
RUN npm install -g pnpm

RUN pnpm install
RUN pnpm build

EXPOSE 3000
CMD ["pnpm", "start"]
