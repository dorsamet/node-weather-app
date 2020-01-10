const request = require('request');
const chalk = require('chalk');

const forecast = (longitude, latitude, callback) => {
    const forecastUrl = `https://api.darksky.net/forecast/ed9fc1dbc90c559686ee24a457c3751d/${latitude},${longitude}?units=si`;
    request({
        url: forecastUrl,
        json: true
    }, (error, { body }) => {


        if (error) {
            callback(chalk.red(`Unable to connect to service!`), undefined);
            return;
        }

        if (body.error) {
            callback(chalk.red("Unable to find a location"), undefined);
            return;
        }

        const currently = body.currently;

        callback(undefined, 
            body.daily.data[0].summary +  ' It is currently ' + body.currently.temperature + ' degrees out. Today\'s high is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '. There is a ' + body.currently.precipProbability + '% chance of rain'
        );
    });
}

module.exports = forecast;