const request = require('postman-request')

const forecast = (lon, lat, cb) => {
    const url = "http://api.weatherstack.com/current?access_key=8bba3decbe1bc82646e912f7337ccf14&query=" + lon + "," + lat;
    request(url, function(error, response){
        if(error)
        {
            cb(error, undefined)
        }else {
            const pdata = JSON.parse(response.body);
            if(pdata.success == false){
                cb("Couldn't find your location", undefined)
            }else {
                let s = "Current Weather is "+pdata.current.weather_descriptions[0];
                s += ". lattitude is "+pdata.location.lat + " Longitude is "+pdata.location.lon;
                s += ". It is currently "+pdata.current.temperature + " but feels like it is " + pdata.current.feelslike;
                
                cb(undefined, s);
            }
        }
    })
}

module.exports = forecast