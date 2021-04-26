import path from "path"
import express, { response } from "express"
import hbs from 'hbs'
import geocode from "./utils/geocode.js"
import forecast from "./utils/forecast.js"

const app = express()
const port = process.env.PORT || 3000

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', './templates/views')
hbs.registerPartials("./templates/partials")

// Setup static directory to serve
app.use(express.static('public'))

app.get("", (req, res) =>{
  res.render('index', {
    title: 'Weather',
    name: "JP"
  })
})

app.get("/about", (req, res) =>{
  res.render('about', {
    title: 'About me',
    name: "JP"
  })
})

app.get("/help", (req, res) =>{
  res.render('help', {
    title: 'Help Page',
    name: "JP",
    message: "Building"
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address){
    return res.send({
      error: "You must provide an address"
    })
  }

  geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
    if (error) {
      return res.send({error})
    }
    
    forecast(longitude, latitude, (error, forecastData) => {
      if (error) {
        return res.send({error})
      }
      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.address
    })
  })
  })
})

app.get('/products', (req, res) =>{
  if (!req.query.search){
    return res.send({
      error: "You must provide a search term"
    })
  }

  console.log(req.query.search)
  res.send({
    products: [],
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    name: "JP",
    message: "Help Page not found"
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Page',
    name: "JP",
    message: "Page not found"
  })
})

app.listen(port, () => {
  console.log('Server is up on port' + port)
})