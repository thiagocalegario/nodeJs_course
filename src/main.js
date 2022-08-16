const express = require("express")
const path = require("path")
const hbs = require('hbs')
const app = express()
const coord = require("./../../section5/sup")
const port = process.env.PORT || 3000

app.use(express.static(publicDirectFolder))

app.get('', (req, res) =>{
    res.render('index', {
        tittle: 'Weather app',
        name: 'Thiago Calegario'
    })
})
app.get('/products', (req, res) => {
    if (!req.query.search){
        req.send('Você não especificou o produto para busca')
    } else{
        console.log(req.query.search)
        res.send({
            products: []
        })
    }
})
app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address) {
        console.log('Please provide an address')
    } else {
        coord.getCoords(address, (error, {latitude, longitude} = {}) => {
            if (error) {
                res.send({
                    error
                })
            }
            coord.printConditions(latitude, longitude, (error, feelslike) => {
                if (error) {
                    return console.log(error)
                }

                res.send({
                    feelslike
                })
            })
        })
    }
})
app.get('/about', (req, res) => {
    res.render('about', {
        tittle: 'About page',
        name: 'Thiago Calegário',
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        tittle: 'Help page',
        descrine: 'You can get help here',
        name: 'Thiago Calegario'
    })
})

app.get('/help/*', (req, res) => {
    res.render('notfound',{
        tittle: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('notfound', {
        tittle: 'This page does not exist'
    })
})
app.listen(port, () => {
    console.log("Your server is on in the port 3000")
})