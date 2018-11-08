const inq = require('inquirer')
const db = require('./models');
const dbsync = db.sequelize.sync()

dbsync.then(() => {
    db.products.findAll({})
        .then(productsArr => {
            inq.prompt({
                type: 'list',
                name: 'selection',
                message: 'Select a function',
                choices: ["View Products For Sale", "View Low Inventory", "Add To Inventory", "Add New Product"]
            })
                .then(answers => {
                    switch (answers.selection) {
                        case "View Products For Sale":
                            console.log(`ITEM# | NAME                    | PRICE | STOCK `)
                            productsArr.forEach(product => {
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
                            productsArr.forEach(product => {
                                if (product.dataValues.stock_quantity < 5) {
                                    console.log(`------|--------------------------|-------
${product.dataValues.item_id}${Array(7 - product.dataValues.item_id.toString().length).join(" ")}| \
${product.dataValues.product_name} ${Array(25 - product.dataValues.product_name.length).join(" ")}| \
${product.dataValues.stock_quantity}`)
                                }
                            })
                            break
                        case "Add To Inventory":
                            inq.prompt({
                                type: 'list',
                                name: 'addInvName',
                                message: 'Select product to restock',
                                choices: productsArr.map(product => product.dataValues.product_name)
                            })
                                .then(answers => {
                                    //find index of selected product, to get it's current stock
                                    const index = productsArr.findIndex(product => product.product_name === answers.addInvName)
                                    
                                    inq.prompt({
                                        name: 'addInvQuantity',
                                        message: `Enter quantity of ${answers.addInvName} to add to inventory`
                                    })
                                        .then(answers => {
                                            if (parseInt(answers.addInvQuantity)) {
                                                const newStockQty = answers.addInvQuantity + productsArr[index].dataValues.stock_quantity
                                                db.products.update({ stock_quantity: newStockQty }, { where: { product_name: answers.addInvSelection } })
                                            } else {
                                                console.log('Enter a Number.')
                                                qtySelection(selectionName, currentStock)
                                            }
                                        })
                                })
                            break
                        case "Add New Product":

                            break
                    }
                })
        })
})