const request = require('request')

const geocode = (address,callBack) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiZGViYWxpbmFzYWhhMTEiLCJhIjoiY2t5YjlidW9yMGQ0ejJ2cGJxanF3ajk1OCJ9.TaEVo4GuRO5dnmx82HQKLw&limit=1'

    request({url,json:true}, (error,{body}) => {
        if(error){
            callBack('Unable to connect',undefined)
        } else if(body.features.length === 0){
            callBack('Unable to find location.. try another search..',undefined)
        } else {
            callBack(undefined, {
                latitute: body.features[0].center[1],
                longitute: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode