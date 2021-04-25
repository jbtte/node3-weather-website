import request from 'request'

const forecast = (lat, long, callback) =>{
  const url = `http://api.weatherstack.com/current?access_key=da7de0ebe5bf9448cf49487144f4eed7&query=${long},${lat}`

  request({url, json: true}, (error, {body}) => {
    if (error) {
      callback("Unable to reach weather service", undefined)
    } else if (body.error) {
      callback("Unable do find location", undefined)
    } else {
      callback(undefined, `${body.current.weather_descriptions[0]}.`
                                        + ` It is currently ${body.current.temperature} degrees out. `
                                        + `It feels like ${body.current.feelslike} degrees out`)
    }
  })
}

export default forecast