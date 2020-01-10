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

        callback(undefined, {
            summary: body.daily.data[0].summary,
            currentTemperature: currently.temperature,
            currentPrecipProbability: currently.precipProbability
        });
    });
}

module.exports = forecast;