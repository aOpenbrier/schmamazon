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
                    switch (answers.selection) {
                        case "View Products For Sale":
                            console.log(`ITEM# | NAME                    | PRICE | STOCK `)
                            results.forEach(product => {
                                console.log(`------|-------------------------|-------|-------
${product.dataValues.item_id}${Array(7 - product.dataValues.item_id.toString().length).join(" ")}| \
${product.dataValues.product_name}${Array(25 - product.dataValues.product_name.length).join(" ")}| \
${product.dataValues.price}${Array(7 - product.dataValues.price.toString().length).join(" ")}| \
${product.dataValues.stock_quantity}`
                                )
                            }
                            )
                            break
                        case "View Low Inventory":
                            console.log(`ITEM# | NAME                     | STOCK `)
                            results.forEach(product => {
                                if (product.dataValues.stock_quantity < 5) {
                                    console.log(`------|--------------------------|-------
${product.dataValues.item_id}${Array(7 - product.dataValues.item_id.toString().length).join(" ")}| \
${product.dataValues.product_name} ${Array(25 - product.dataValues.product_name.length).join(" ")}| \
${product.dataValues.stock_quantity}`)
                                }
                            })
                            break
                        case "Add To Inventory":

                            break
                        case "Add New Product":

                            break
                    }
                })
        })
})