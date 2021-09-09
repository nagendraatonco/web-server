const request = require('postman-request')

const geocode = (address, cb) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoibmFnZW5kcmFhbWJpZyIsImEiOiJja2p6bGsxMmowOHJ6MnBydXQ2eW9ubTV3In0.q4xwp96ho1HlLFccXCsnnw&limit=1"
    request(url, function(error, response){
        if(error)
        {
            cb(error, undefined)
        }else {
            const pdata = JSON.parse(response.body);
            if(pdata.features.length == 0){
                cb("Couldn't find your location", undefined)
            }else {
                cb(undefined,pdata.features[0].center)
            }
        }
    })
}

module.exports = geocode