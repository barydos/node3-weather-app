const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address)  +  
    ".json?access_token=pk.eyJ1IjoiYmFyeWRvcyIsImEiOiJjazlxdnE4ZzgwbzQ5M2p0cmp0ejdxMXlwIn0.JuBPijw9PnR5g_ia7XXc9Q&limit=1"
    request({ url, json: true}, (err, { body }) => {
        if (err) {
            callback('Unable to connect to location services!', undefined)
        } else if ( body.features.length === 0) {
            callback('Location not found!', undefined)
        } else {
            callback(undefined, {
                lon: body.features[0].center[1],
                lat: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }

    })
}

module.exports = geocode