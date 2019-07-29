const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs')
const utils = require('./utils/utils')

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        'title': 'Weather',
        'name': 'DevD'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        'title': 'About Us',
        'name': 'DevD'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        'title': 'Help',
        'name': 'DevD'
    });
})

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: 'You must provide address!'
        })
    }

    utils.geocode(address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: 'Something went wrong: ' + error
            })
        }
        utils.forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({
                    error: 'Something went wrong: ' + error
                })
            }
            return res.send({
                forecast,
                address,
                location
            });
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        'title': '404',
        'errorMessage': 'Page Not Found!'
    });
})

app.listen(3000, () => {
    console.log("Listening on 3000");
});