const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const viewsPath = path.join(__dirname, '..', 'templates/views');
const partialsPath = path.join(__dirname, '..', 'templates/partials');
//

// Setup handlebars location and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Dor Samet'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    const { address } = req.query;

    const locationArgument = address;

    geocode(locationArgument, (error, { name, latitude, longitude } = {}) => {
        console.log(error);
        if (error) {
            return res.send({error});
        }

        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({error});
            }

            return res.send({
                forecast,
                location: name,
                address
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    res.send({
        products: []
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a help page',
        title: 'Help',
        name: 'Dor Samet'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Dor Samet',
        image_location: 'img/profile_picture.jpg'
    })
});

app.get('/help/*', (req, res) => {
    res.render('help-article', {
        title: 'Article not found',
        name: 'Dor Samet'
    });
});

app.get('*', (req, res) => {
    res.render('not-found', {
        title: '404 Not Found',
        name: 'Dor Samet'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});