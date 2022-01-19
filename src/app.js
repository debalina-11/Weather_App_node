const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define path for express confic
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handelbar engine and view location
app.set('view engine','hbs')
app.set('views',viewsPath)

hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather App',
        name:'Dola'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Me',
        name:'Dola'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title:'Help',
        helptext: 'This is some helpfull text',
        name:'Dola'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error:'You must provide address'
        })
    }
    
    geocode(req.query.address, (error, {latitute,longitute,location} = {}) => {
        if (error) {
            return res.send({error})
        }
        forecast(latitute,longitute, (error,forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })

        })
    })
})

app.get('/products',(req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'dola',
        errorMassage:'Help article not found'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title:'404',
        name:'Dola',
        errorMassage:'page not found'
    })
})

app.listen(5000,()=>{
    console.log('Server is up on port 3000');
})