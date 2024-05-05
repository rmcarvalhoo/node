### SETUP

## Install the adonis 
npm init adonis-ts-app@latest hello-world

## Install the pakcge for this project
npm install

## Copy the file .env.example and rename to .env
.env

## Adonis generate key and copy the new key to the .env file
node ace generate:key

## Start the project
node ace serve

## test
curl --location --request GET 'http://localhost:3333/api/moments'

response:
{
    "message": "select * from `moments` - SQLITE_ERROR: no such table: moments",
    "stack": "Error: select * from `moments` - SQLITE_ERROR: no such table: moments",
    "code": "SQLITE_ERROR"
}

## Create database
node ace migration:run

## SQLite - the database table is here
tmp/db.sqlite3

## Postman
curl --location --request GET 'http://localhost:3333/api/moments'


