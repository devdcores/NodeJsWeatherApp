const request = require('request');

geocode = (placeName, callback) => {
    request({
        url: "http://api.mapbox.com/geocoding/v5/mapbox.places/" + placeName + ".json?access_token=pk.eyJ1IjoiZGV2YXJhanJlZGR5Z2RyIiwiYSI6ImNqeWNwaHA4czBrbm0zam52cWpxcjY0dncifQ.FJ_WT0yL3kwXVuUoEQbPRg",
        json: true
    }, (err, res) => {
        if (err) {
            return callback("Error Occured " + err, undefined);
        } else if (res.body.features.length == 0) {
            return callback("Unable to find location, try another search.", undefined);
        } else {
            return callback(undefined, {
                latitude: res.body.features[0].center[0],
                longitude: res.body.features[0].center[1],
                location: res.body.features[0].place_name
            });
        }
    })
}

forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/ef4889730c5e91731c89ec9ad857d96c/" + latitude + "," + longitude + "#";

    request({
        url: url,
        json: true
    }, (err, res) => {
        if (err) {
            return callback("Error Occured : " + err, undefined);
        } else if (res.body.error) {
            return callback("Exception from service : " + res.body.error, undefined);
        } else {
            return callback(undefined, res.body.daily.data[0].summary+" Current temparature: "+ res.body.currently.temperature );
        }
    })
}

module.exports = {
    geocode: geocode,
    forecast: forecast
}