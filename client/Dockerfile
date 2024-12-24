FROM node:22 AS build
RUN npm install -g pnpm

WORKDIR /pomodoro
COPY client/ ./client
COPY shared ./shared

WORKDIR /pomodoro/shared
RUN pnpm install

WORKDIR /pomodoro/client
RUN pnpm install
RUN pnpm build

FROM nginx:stable-alpine

COPY --from=build /pomodoro/client/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /pomodoro/client/dist/client /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
