# Schmamazon

## Apps

### Schmamazon Customer app
##### Purchase an item from Schmamazon

At Command Line Interface navigate to project folder and run the command: 
```shell
node schmamazonCustomer.js
```

Select an item for purchase<br/>
![screenshot](./readme/SC1.jpg)<br/>
Enter a quantity for purchase,<br/>  
If quantity is available, purchase will be completed:<br/>
![screenshot](./readme/SC2a.jpg)<br/>
Else, the amount available will be sold:<br/>
![screenshot](./readme/SC2b.jpg)  

### Schmamazon Manager app
At Command Line Interface navigate to project folder and run the command:
 ```shell
 node schmamazonManager.js
 ```
Select from 4 manager functions:<br/>
![screenshot](./readme/SM1.jpg)
##### View Products:
![screenshot](./readme/SM2.jpg)
##### View Low Inventory:
![screenshot](./readme/SM3.jpg)
##### Add To Inventory:
![screenshot](./readme/SM4a.jpg)<br/>
Must enter a number to update<br/>
![screenshot](./readme/SM4b.jpg)<br/>
Else, error message<br/>
![screenshot](./readme/SM4c.jpg)
##### Add New Product:
![screenshot](./readme/SM5a.jpg)<br/>
Database requires decimal value for price<br/>
![screenshot](./readme/SM5b.jpg)
##### View Products (updated):
Database reflects updates after each command<br/>
![screenshot](./readme/SM6.jpg)
## Installation

If you haven't already, install [Node.js](https://nodejs.org/en/download/)

Clone the repository to your computer. At Command Line Interface, navigate to the project folder and run the following to install the node packages:

 `````````shell
 npm i
 `````````

In MySQL Workbench run the following command:

```sql
CREATE DATABASE schmamazon_db;
```

In config folder, rename `configtemplate.json` to `config.json`
Open the `config.json` file and enter your mysql username and password. Update the database name and port if neccessary.

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