pg_user?=postgres
pg_password?=postgres

start:
	@docker-compose up -d
	@docker-compose logs -f postgres

stop:
	@docker-compose stop adminer
	@docker-compose stop postgres

clean:
	@docker-compose down
	
psql:
	@docker-compose exec postgres psql -U $(pg_user) $(pg_password)

logs:
	@docker-compose logs -f postgres
