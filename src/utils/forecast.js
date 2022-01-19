const request = require('request')

const forecast = (latitute,longitute,callBack) => { 
    const url = 'http://api.weatherstack.com/current?access_key=2ba7fe23812006cc10929ebf8eaed32c&query='+latitute+','+longitute+'&units=f'

    request({url , json:true}, (error,{body}) => {
        if(error){
            callBack('unable to connect',undefined)
        }else if(body.error){
            callBack('Unable to find Location',undefined)
        }else{
            callBack(undefined,body.current.weather_descriptions[0] + '. It is currently ' +body.current.temperature + ' degrees out. there is a ' +body.current.precip + '% chances of rain')
        }
    })
}

module.exports = forecast