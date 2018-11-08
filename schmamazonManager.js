const inq = require('inquirer')
const db = require('./models');
const dbsync = db.sequelize.sync()

dbsync.then(() => {
    db.products.findAll({})
        .then(results => {
            inq.prompt({
                type: 'list',
                name: 'selection',
                choices: ["View Products For Sale", "View Low Inventory", "Add To Inventory", "Add New Product"]
            })
                .then(answers => {
                    switch (answers.selection){
                        case "View Products For Sale":

                        break
                        case "View Low Inventory":

                        break
                        case "Add To Inventory":

                        break
                        case "Add New Product":
                        
                        break
                    }
                })
        })
})