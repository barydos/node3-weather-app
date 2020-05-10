const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup Express app 
const PORT = 3000
const app = express()

// Setup handlebars engine and views location
hbs.registerPartials(partialsPath)
app.set('views', viewsPath)
app.set('view engine','hbs')

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        message: "This website is used to get the weather!",
        name: "Barry"
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            "error": "Address not provided!"
        })
    } 

    geocode(req.query.address, (error, { lon:longitude, lat:latitude, location} = {}) => {
        if (error) {
            return res.send({ 
                "error": error
             })
            
        } else {
            forecast(longitude, latitude, (error, forecastData) => {
                if (error) {
                    return res.send( { 
                        "error": error
                     } ) 
                } else {
                    res.send({
                        location,
                        forecast: forecastData,
                        address: req.query.address
                    })
                }
            })
        }
    })

    
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Barry"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        errorMessage: "Please Google your problem!",
        name: "Barry"
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404", 
        errorMessage: "Help article not found!",
        name: "Barry"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404",
        errorMessage: "Page not found!",
        name: "Barry"
    })
})

app.listen(PORT, () => {
    console.log("Listening on port: " + PORT)
})