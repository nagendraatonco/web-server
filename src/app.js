const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const geocode = require('./map')
const forecast = require('./forecast')
const port = process.env.PORT || 3000;
console.log(__dirname)
const publicFolder = path.join(__dirname, "../public")
app.use(express.static(publicFolder))
app.set('view engine', 'hbs')
const viewspath = path.join(__dirname, "../templates/views")
const partialpath = path.join(__dirname, "../templates/partials")
hbs.registerPartials(partialpath)
app.set('views', viewspath)
app.get('/', (req, res) => {
    res.render('index',{
      title : "weather",
      name : "Nagendra"
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
      name : "Nagendra",
      title : "About US"
    })
})

app.get('/help', (req, res) => {
  res.render('help', {
    name : "Nagendra",
    title : "Help",
    message : "If you want any help please contact"
  })
})
app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
          error : "Please specify the address"
        })
    }
    geocode(req.query.address, (error, data)=>{
      if(error){
          res.send({error})
      } else {
          forecast(data[1],data[0], (err, data) => {
              if(err || data == undefined){
                  res.send({error : err})
              } else {
                  res.send({data, data})
              }
          })
      }
  })
  })   


app.get('/help/*', (req, res) => {
    res.render('404page',{
      title : "Article not found"
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
      title : "404 page Not Found"
    })
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});