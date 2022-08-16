const request = require("request");

const getCoords = (city, callback ) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + city + ".json?proximity=ip&types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1IjoidGhpYWdvY2FsZWdhcmlvIiwiYSI6ImNsNm1jbmFtajBrYW0zZG10aXBycnU2YWoifQ.spFuCwC5RHuPrA8YG5-4pw&limit=1"
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined, undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined, undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
}
const printConditions = (coord2, coord1, callback)  =>{
    const url = "http://api.weatherstack.com/current?access_key=7ac710f5433ce63d483701b3fcc255f9&query=" + coord2 + "," +coord1
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, "Está fazendo "+ body.current.temperature + " graus em " + body.location.name + ' ' + body.location.region  + ". Sensação termica de " + body.current.feelslike)
        }
    })
}
module.exports = {
    getCoords,
    printConditions
}