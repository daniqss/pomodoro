FROM node:22

WORKDIR /pomodoro/server
COPY server .
COPY types ../types
RUN npm install -g pnpm

RUN pnpm install
RUN pnpm build

ENV NODE_ENV=production
ENV HOST_ADDRESS=server
ENV PORT=3000
EXPOSE 3000
CMD ["pnpm", "start"]
