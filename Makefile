build: 
	docker build -f client/Dockerfile -t pomodoro-client .
	docker build -f server/Dockerfile -t pomodoro-server .
run:
	docker compose up
