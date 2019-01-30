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
                choices: ["View Products For Sale", "View Low Inventory", "Add Stock To Inventory", "Add New Product", "Exit"]
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
                            process.exit()
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
                            process.exit()
                            break
                        case "Add Stock To Inventory":
                            inq.prompt([
                                {
                                    type: 'list',
                                    name: 'addInvName',
                                    message: 'Select product to restock',
                                    choices: productsArr.map(product => product.dataValues.product_name)
                                },
                                {
                                    name: 'addInvQuantity',
                                    message: `Enter quantity to add to inventory`
                                }
                            ])
                            .then(answers => {
                                //find index of selected product, to get it's current stock
                                const index = productsArr.findIndex(product => product.product_name === answers.addInvName)
                                if (!isNaN(answers.addInvQuantity)){
                                    const newStockQty = parseInt(answers.addInvQuantity) + parseInt(productsArr[index].dataValues.stock_quantity)
                                    db.products.update({ stock_quantity: newStockQty }, { where: { product_name: answers.addInvName } })
                                    .then(r => {
                                        console.log(`${answers.addInvName} is updated to ${newStockQty}`)
                                        process.exit()
                                    })
                                    .catch(e => {
                                        console.log(`Error: ${e}`)
                                        process.exit()
                                    })
                                }
                                else {
                                    console.log(`Error: '${answers.addInvQuantity}' is not a numberic value`)
                                    process.exit()
                                }
                            })
                            break
                        case "Add New Product":
                            inq.prompt([
                                {
                                    name: 'product_name',
                                    message: 'Enter Item Name'
                                },
                                {
                                    name: 'department_name',
                                    message: "Enter department"
                                },
                                {
                                    name: 'price',
                                    message: "Enter price"
                                },
                                {
                                    name: 'stock_quantity',
                                    message: "Enter current stock quantity"
                                }
                            ])
                                .then(answers => {
                                    db.products.create({
                                        product_name: answers.product_name,
                                        department_name: answers.department_name,
                                        price: answers.price,
                                        stock_quantity: answers.stock_quantity
                                    })
                                        .then(() => {
                                            console.log(`${answers.product_name} has been added.`)
                                            process.exit()
                                        })
                                        .catch(e => {
                                            console.log(`Error: ${e.original.sqlMessage}`)
                                            process.exit()
                                        })
                                })

                            break
                        default:
                            process.exit()
                            break
                    }
                })
        })
        .catch(e => console.log(e))
})