# Get started

## Clone the repository
Clone this repository. (I don't really know how, but pretty sure this part can be changed later.)

## Install postgresql
This project uses postgresql database so you will need to install it. [Click here to visit their downloads page](https://www.postgresql.org/download/).

Make sure to install using the default settings: -

- Port: `5432`
- Username: `postgres`
- Password: `root`

## Setup the database
Once installed postgresql, execute the queries written in the `setup.sql` file under the `back/db/` directory.

## Install dependencies
Open up any command line client and open up the directory containing this file in it. Then run the following command to install dependecies.
```
npm install
```

## Start the server.
Once done installing the dependencies, start the localhost server by running the follwing command: -
```
DEBUG=carnival:* npm start
```
to start the server in `DEBUG` mode.

## Open up the webapp.
You can now see the output by visiting http://localhost:3000/ in any browser.
