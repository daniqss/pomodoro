FROM node:22 AS build

WORKDIR /pomodoro/client

COPY client/ .
COPY types ../types

RUN npm install -g pnpm
RUN pnpm install

RUN pnpm build

FROM nginx:stable-alpine
COPY  --from=build /pomodoro/client/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /pomodoro/client/dist/client /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]