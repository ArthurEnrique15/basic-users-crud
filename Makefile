app:
	@docker-compose up -d app
test:
	@docker-compose up app_test
destroy:
	@docker-compose down -v --rmi local