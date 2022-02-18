const express = require('express')
const app = express()
const {conn, syncAndSeed, models: {Brew, Brewery}} = require('./db')
app.use(express.urlencoded({extended: false}));

app.get('/', async(req, res, next) => {
    try{
  //no includes because I dont want to show the brew just yet
        const breweries = await Brewery.findAll({
            include: [{model: Brew}]
            // where : {
            //     breweryId: !null
            // }

        }) 

        
       
        const brews  = await Brew.findAll()

        

      
        res.send(`
        <html>
            <title>Top Brews</title>
            <h1>Top Brews of 2021</h1>
            <h3>Click to learn more about the company resonsible for making a top-notch brew!</h3>
            <ul>
            ${brews.map(beer => `

            <li>Top beer for ${beer.brew_type}:
            <a href = '/brewery/${beer.breweryId}'>${beer.name}</a>
            </li>
            
            
            `).join('')}
            </ul>
           

        </html>
        `)
    }catch(ex) {
        next(ex)
    }

})

app.get('/brewery/:id', async(req,res,next)=> {
    try{
        const breweries= await Brewery.findByPk(req.params.id, {
            include: [Brew]

        })
        
        res.send(`
        <html>
            <title>Beers</title>
            <body>
            <a href = '/'>Back to the top brews</a>

            
            <h1>${breweries.name}</h1>
            <p>${breweries.about}
            
            </p>

            <h5>come visit us at ${breweries.address}</h5>

            

            
         
            </body>

        </html>
        
        `) 
      
    }catch(ex) {
        next(ex)
    }

})




const init = async() => {
    try{
        await syncAndSeed()
        const port = 1994
        app.listen(port, () =>console.log(`listening on port ${port}`))

    }catch(ex) {
        console.log(ex)
    }
}


init()