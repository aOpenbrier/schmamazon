# schmamazon

## Installation

In MySQL Workbench run the following command:

```sql
CREATE DATABASE schmamazon_db;
```

In config folder, rename `configtemplate.json` to `config.json`
Open the `config.json` file and enter your mysql username and password
```js
{
    "development": {
        "username": "YOURUSERNAME",
        "password": "YOURPASSWORD",
        "database": "schmamazon_db",
        "host": "127.0.0.1",
        "port": 3306,
        "dialect": "mysql",
        "logging": false
    },
    "test": {
        "username": "YOURUSERNAME",
        "password": "YOURPASSWORD",
        "database": "schmamazon_db",
        "host": "127.0.0.1",
        "port": 3306,
        "dialect": "mysql",
        "logging": false
    },
    "production": {
        "username": "YOURUSERNAME",
        "password": "YOURPASSWORD",
        "database": "schmamazon_db",
        "host": "127.0.0.1",
        "port": 3306,
        "dialect": "mysql",
        "logging": false
    }
}
```