
const Sequelize = require('sequelize')
const conn = new Sequelize('postgres://postgres:banana794@localhost/brewery_sequelize')
//type string is limited to 255char
const {STRING, UUIDV4, UUID, DATE, BOOLEAN, TEXT} = Sequelize

const Brewery = conn.define('brewery', {
    id: {
        primaryKey: true,
        type: UUID,
        defaultValue: UUIDV4
    },
    name: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    about: {
        type: TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    address: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }

    },
    tour: {   
        type: DATE,
        isAvailable: {
            type: BOOLEAN
        }

    }
   

})

const Brew = conn.define('brew', {
    id: {
        primaryKey: true,
        type: UUID,
        defaultValue: UUIDV4
    },
    name : {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    brew_type: {
        type: STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }

    }

})

// const TourBooking = conn.define('tour', {
//     id: {
//         primaryKey: true,
//         type: UUID,
//         defaultValue: UUIDV4
//     },
//     visit: {
//         type: DATE

//     },
//     isAvailable: {
//         type: BOOLEAN
//     }

// })

Brewery.hasMany(Brew)
Brew.belongsTo(Brewery)

const syncAndSeed = async() => {
    try{
        await conn.sync({force: true})
        const brewing = await Brewery.create({name: 'Brewing Company', about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum', address: '400 Brown Cir'})
        const barrel = await Brewery.create({name: 'Barrel Brewing Co.', about: 'Magna fermentum iaculis eu non diam phasellus vestibulum lorem sed. Velit ut tortor pretium viverra suspendisse potenti. Rhoncus aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque. Dictum non consectetur a erat nam. Nisl tincidunt eget nullam non nisi. Sit amet consectetur adipiscing elit pellentesque habitant morbi', address: '62970 18th St'})
        const bros = await Brewery.create({name: 'Bros and Barrels', about: 'Amet venenatis urna cursus eget. Urna id volutpat lacus laoreet. Interdum consectetur libero id faucibus nisl tincidunt eget nullam. Aliquam etiam erat velit scelerisque. Id faucibus nisl tincidunt eget nullam non. Ornare arcu dui vivamus arcu felis bibendum ut tristique. Lorem mollis aliquam ut porttitor leo a diam sollicitudin. Interdum varius sit amet mattis vulputate enim nulla. Pretium lectus quam id leo in. Semper auctor neque vitae tempus quam pellentesque nec nam.', address: '62950 NE 18th St'})
        const bruster = await Brewery.create({name: 'Bruster Brewing Co.', about: 'Eget arcu dictum varius duis at consectetur lorem. Arcu felis bibendum ut tristique et. Sed sed risus pretium quam vulputate dignissim. Tincidunt dui ut ornare lectus sit amet est placerat in. Quam vulputate dignissim suspendisse in est ante in.', address:'490 Mill St'})
        const acres = await Brewery.create({name: '12 Acres Brewing Company', about:'Tincidunt dui ut ornare lectus sit amet est placerat in. Quam vulputate dignissim suspendisse in est ante in. Est ullamcorper eget nulla facilisi etiam dignissim diam. Tempus egestas sed sed risus pretium quam. Sit amet nulla facilisi morbi tempus iaculis.', address: '6820 Bourgeois Rd'})
       
        
        const interdum = await Brew.create({name: 'Interdum Consectetur', brew_type:'Quq Lite', breweryId: barrel.id})
        const faucibus = await Brew.create({name: 'Id Faucibus',brew_type: 'Foo Dark', breweryId: acres.id})
        const arcu = await Brew.create({name: 'Arcu Felis bibendum',brew_type:'Bar Ultra Lite', breweryId: bruster.id })
        const quam = await Brew.create({name: 'Quam Vulputate',brew_type:'Foo', breweryId: bros.id })
        const est = await Brew.create({name: 'Est Ullamcorper',brew_type: 'Bazz', breweryId: barrel.id  })
        const quis = await Brew.create({name: 'Quis Nostrud',brew_type:'Micro', breweryId: brewing.id })

        // interdum.breweryId = brewing.id
        // faucibus.breweryId = barrel.id
        // arcu.breweryId = bros.id
        // quam.breweryId = bruster.id
        // est.breweryId = acres.id
        // quis.breweryId = barrel.id
        // await interdum.save()
        // await faucibus.save()
        // await arcu.save()
        // await quam.save()
        // await est.save()
        // await quis.save()





        
    }catch(ex) {
        console.log(ex)
    }
}

// Brew.findBrewery = function(){
//     return this.findAll( {
//         where: {
//             breweryId: Brewery.id
//         }
//         // include : [
//         //     {model: Brew}
        
//         // ]
//     })
    
// }

module.exports = {
    conn,
    syncAndSeed,
    models : {
        Brew,
        Brewery,
       
    }

}

