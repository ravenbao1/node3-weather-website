const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6e927e9304b4e5b34dc50ef348bbc4b1&query=query=' + latitude + ',' + longitude + '&units=m'

    // encodeURLComponent for string with special characters

    request({url, json: true}, (error, { body }) => {
        if (error){
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('There is no matching cordinates! Try another search', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0])
        }
    })
}

module.exports = forecast