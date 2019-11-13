# get started

## install postgresql

this project uses postgresql database so you will need to install it. [click here to visit their downloads page](https://www.postgresql.org/download/).

make sure to install using the default settings

- port: `5432`
- username: `postgres`
- password: `root`

## setup the database

once installed postgresql, execute the queries written in the `setup.sql` file under the `/database` directory.

## install dependencies

sorry about global pillow dep, poetry and pyenv wouldnt cooperate - its temporary until we get actual images and games

```sh
pip install --user Pillow
yarn install
```

## build

runs ./gen/generateLetterImages.py and copies them to server directory ./public/img/game-image

```sh
gulp build
```

## start

to start the server in `debug` mode - at port 4000

```sh
debug=carnival:* yarn start
```
