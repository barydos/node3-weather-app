const request = require('request')

const forecast = (lon, lat, callback) => {
  const url = "http://api.weatherstack.com/current?access_key=13492e1c329cf4f06fd6dfca9c9a738c&query=" + lon + "," + lat + "&units=m"
  request({ url, json: true}, (err, {body}) => {
    if (err) {
      callback("Unable to connect to forecast service!", undefined)
    } else if (body.error) {
      callback(body.error.info, undefined)
    } else {
      // const data = body
      // const { temp: temperature, tempReal: feelslike, weather: weather_descriptions } = data.current
      const temp = body.current.temperature
      const tempReal = body.current.feelslike
      // console.log(body.current.weather_descriptions[0])
      // console.log(temp)
      callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${temp} degrees out. It feels like ${tempReal} degrees out.`)
    }
  })
}

module.exports = forecast