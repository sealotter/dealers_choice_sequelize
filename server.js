const express = require('express')
const app = express()
const Sequelize = require('sequelize')
const conn = new Sequelize('postgres://postgres:banana794@localhost/brewery_sequelize')
const {STRING} = Sequelize

const Brewery = conn.define('brewery', {
    name: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },



    
})

const Brew = conn.define('brew', {
    name : {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

Brewery.hasMany(Brew)
Brew.belongsTo(Brewery)

const syncAndSeed = async() => {
    try{
        await conn.sync({force: true})
        //await Brewery

        //Brewery.create({name})

        

    }catch(ex) {
        console.log(ex)
    }
}

syncAndSeed()

const init = async() => {
    try{
        const port = 1994
        app.listen(port, () =>console.log(`listening on port ${port}`))

    }catch(ex) {
        console.log(ex)
    }
}


init()