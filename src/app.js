const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//console.log(__dirname) 
//console.log(path.join(__dirname, '../public')) //point to the public folder

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs') // setup handlebars for creating dynamic templates
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath)) //serve the public folder to the server, static webpage

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Raven Bao'
    })
}) //render the file named "index", in this case, index.hbs

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Raven Bao'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helptext: 'This is some helpful text.',
        name: 'Raven Bao'
    })
})

app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
}) // defines what the server should do when the url is requested

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    else {
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return console.log(error)
            } 
            forecast(latitude, longitude, (error, forecastData) => {
              if (error) {
                return console.log(error)
              }
              console.log(location)
              console.log(forecastData)
              res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
          })
        })
    }
    

    console.log(req.query.address)
    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term!'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

// app.com
// app.com/help
// app.com/about

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 help',
        name: 'Raven Bao',
        errorMessage: "Help article not found."
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Raven Bao',
        errorMessage: "Page not found."
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})