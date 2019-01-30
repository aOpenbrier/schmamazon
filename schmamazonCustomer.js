const fs = require('fs')
const inq = require('inquirer')
const db = require("./models");
const dbsync = db.sequelize.sync()

// Check if seed data function was run locally
fs.readFile('install.txt', 'utf8', (e, data) => {
    if (e) {
        dbsync.then(() => {
            //populate table:
            seedData()
            fs.writeFile('install.txt', 'just having the file is enough', e => console.error(e))
        })
    } else {
        itemSelection()
    }
})

function itemSelection() {
    dbsync.then(() => {
        db.products.findAll({
            attributes: ['product_name']
        })
            .then(productArr => {
                inq.prompt({
                    type: 'list',
                    name: 'selection',
                    message: 'Item to purchase'
                    choices: function (){
                        const choiceArr = productArr.map(each => each.dataValues.product_name)
                        choiceArr.push('-CANCEL ORDER-')
                        return choiceArr
                    }
                })
                    .then(answers => {
                        if (answers.selection === '-CANCEL ORDER-'){
                            process.exit()
                        } else {
                            qtySelection(answers.selection)
                        }
                    })
            })
    })
}

function qtySelection(selection) {
    inq.prompt({
        name: 'quantity',
        message: `Enter quantity for ${selection}:`
    })
    .then(answers => {
        if (parseInt(answers.quantity)) {
            db.products.findOne({
                where: {product_name: selection}
            })
            .then(r =>{
                const orderQty = answers.quantity
                const stockQty = r.dataValues.stock_quantity
                const price = r.dataValues.price
                if (orderQty <= stockQty){
                    const newStockQty = stockQty - orderQty
                    db.products.update({stock_quantity: newStockQty}, {where: {item_id: r.dataValues.item_id}})
                    .then(() => {
                        console.log(`Your total is: $${orderQty * price }`)
                        process.exit()
                    })
                    .catch(e => {
                        console.log(e)
                        process.exit()
                    })
                }
                else{
                    db.products.update({stock_quantity: 0}, {where: { item_id: r.dataValues.item_id }})
                        .then(() => {
                            console.log(`Sorry not enough! You can have ${stockQty}. Your total is: $${stockQty * price}`)
                            process.exit()
                        })
                        .catch(e => {
                            console.log(e)
                            process.exit()
                        })
                }
            })
        } else {
            console.log('Enter a Number.')
            qtySelection(selection)
        }
    })
}

function seedData() {
    db.products.bulkCreate([
        {
            product_name: 'Coffee',
            department_name: 'Beverage',
            price: 5.00,
            stock_quantity: 10
        },
        {
            product_name: 'Green Tea',
            department_name: 'Beverage',
            price: 4.00,
            stock_quantity: 15
        },
        {
            product_name: 'Ballast Point Sculpin',
            department_name: 'Alcohol',
            price: 11.00,
            stock_quantity: 6
        },
        {
            product_name: 'Guinness Stout',
            department_name: 'Alcohol',
            price: 9.00,
            stock_quantity: 3
        },
        {
            product_name: 'Bread',
            department_name: 'Bakery',
            price: 3.00,
            stock_quantity: 20
        },
        {
            product_name: 'Cookies',
            department_name: 'Bakery',
            price: 4.00,
            stock_quantity: 10
        },
        {
            product_name: 'Doritos Flamas',
            department_name: 'Snacks',
            price: 4.00,
            stock_quantity: 6
        },
        {
            product_name: 'Doritos Cool Ranch',
            department_name: 'Snacks',
            price: 4.00,
            stock_quantity: 8
        },
        {
            product_name: 'Pizza',
            department_name: 'Frozen',
            price: 5.00,
            stock_quantity: 6
        },
        {
            product_name: 'Nuggets',
            department_name: 'Frozen',
            price: 4.00,
            stock_quantity: 6
        }
    ])
}

