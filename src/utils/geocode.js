const request = require('request');

const geocode = (address, callback) => {
    const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZG9yc2FtZXQiLCJhIjoiY2s1Mnc2N3VyMDF6YjNsdDFkazFmenNjNyJ9.4S2nOWCzKPSYmLaauVFowA&limit=1`;

    request({
        url: geocodeUrl,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback(error, undefined);
        } else if (!body.features || body.features.length === 0) {
            callback("Unable to find a location, try another search!", undefined);
        } else {
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            const name = body.features[0].place_name;
            callback(undefined, {
                latitude,
                longitude,
                name
            })
        }
    })
}

module.exports = geocode;