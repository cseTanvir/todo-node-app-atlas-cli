## Project Directory structure

- project/
    - api/
        - config/
            - dbConfig.js
        - controllers/
            - TodoController.js
        - Models/
            - index.js
            - todoModel.js
        - Routes/
            - todoRoutes.js
        - schema/
            - schema.hcl (encoding must be UTF-8) 
        - .env
        - index.js
        - package.json

    - front/
        - public/
            - index.html
        - src/
            - App.js
            - index.css
            - NewTodo.js
            - Todo.js
            - TodoList.js
        - package.json
        - postcss.config.js
        - tailwind.config.js




## How to migrate database, goto  /api/atlas-cli , then run the following command

``` atlas schema apply  -u "mysql://todo_atlas_user:todo_atlas_password@localhost:3306/todo_atlas"  --to file://schema.hcl ```


Assuming you already have a running mysql server, here are the parameters you should change accordingly:
1. "todo_atlas_user" should be replaced with "user"
2. "todo_atlas_password" should be replaced with "password"
3. "todo_atlas" should be replaced with the database name

If you want to know more about **atlas-CLI** please visit, https://atlasgo.io/getting-started/ 

## How to run the backend, goto /api directory, then run the following commands:

``` npm install ```

``` npm run dev ```

The backend will be run on port 5000

## how to run the frontend, goto /front, then run the following commands:

``` npm install ```

```npm start ```

If you change the port number in api/.env, then change 'proxy' value in '/front/package.json' accordingly
