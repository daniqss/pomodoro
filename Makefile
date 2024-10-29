.PHONY: build run

# local development
install:
	pnpm install

dev:
	pnpm dev

# production
build: 
	docker build -f client/Dockerfile -t pomodoro-client .
	docker build -f server/Dockerfile -t pomodoro-server .

run: 
	docker compose up
