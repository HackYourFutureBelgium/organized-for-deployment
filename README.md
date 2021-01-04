## 1. Go to the `client` folder 
- Delete node_modules folder
- Delete file `package-lock.json`
- Delete file `package.json`
## 2. In the main folder of the project 
- Delete node_modules folder
- Delete file `package-lock.json`
- Delete file `package.json`

## 3. Pull the last changes from github
it will contain `package.json`

## 4. Go to the `client` folder
- run `npm install`
## 5. Back to the main folder of the progect
- run `npm install`

## 6. Starts from now we can't run only frontend separately, thats because we already check if user is Authenticated, so in order to run the project do the following steps:
- In the `main folder` of the project (server side) open terminal and run `nodemon index`

- In the `client` folder (frontend side) open another terminal and run `npm start`

 And Voilà, the project hopefully should run 😁. Since there is already `.env` file, you will automatically be connected to the database. You can see line`connected to the database` in your `server side` terminal.
