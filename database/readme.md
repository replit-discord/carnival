# database

## setting up postgres

we are using [postgres 12(https://www.postgresql.org/download)

install it using the default settings

- port: `5432`
- username: `postgres`
- password: `root`

execute the queries written in the `setup.sql` file under the `/database` directory.

if you cant get the postgres db setup, thats okay, most things should work because a lot of things are mocked right now

## debug

starts the server in `debug` mode at port 4000

```sh
debug=carnival:* yarn start
```
