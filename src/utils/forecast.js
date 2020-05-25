const request = require('request')

function FC(fahrenheit) {
  const fData = parseInt(fahrenheit) - 32;
  console.log(fData)
  return Math.round(fData/1.8)
} 

const forecast = (latitude, longitude ,callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=222a75c7259adec9f61d9905c2904877&query=' + longitude + ',' + latitude + '&units=f'

  request({url, json: true }, (error, {body})=> {
      if(error){
        callback('Unable to connect to weather service', undefined)
      }else if(body.error){
        callback('Unable to find location', undefined)
      }else{
        callback(undefined, body.current.weather_descriptions[0] + ". It it is currently " + body.current.temperature + "F degrees ("+FC(body.current.temperature) +"C degrees) out. It feels like " + body.current.feelslike + "F degrees ("+FC(body.current.feelslike) +"C degrees) out. The humidity is " + body.current.humidity + "%.")
      }
    })
}


module.exports = forecast