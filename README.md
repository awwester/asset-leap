# Summary
This is an example project used to show my general coding principals, structure and design for building single page web applications.

Users can track their net worth by entering asset and liability values and then view their net worth statements over time.

# Install
The only system requisites are docker and docker-compose, everything else is handled inside the docker container.

1) `make setup` (or run the setup commands in Makefile if you don't have make installed.)
2) `docker-compose up`
3) `make migrate`

# Usage

##### Running django commands
Since the project is running in a docker container you can run django commands
with `docker-compose exec django ./manage.py <command>`.

##### Running tests
You can run tests with `make test` or run with extra options using a docker-compose exec script.

##### Owning files
When generating new files through `startapp` or `makemigrations` for instance, the files will not be owned by you and you won't have permission to modify. You can fix that by running `make chown`.
