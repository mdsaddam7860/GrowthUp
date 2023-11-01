const request = require('request')
const https = require('https')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
app.set('view engine', 'ejs')

mongoose.connect('mongodb://127.0.0.1:27017/contactGrowthup', { useNewUrlParser: true })

var db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', function () {
  console.log('We are Connected')
})
// mongoose schema
const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  message: String
});
// mongoose model
const Contact = mongoose.model('Contact', contactSchema)



// app.post('/contactDbs', function (req, res) {
//     var myData = new Contact(req.body);
//     myData.save().then(() => {
//         res.render('serviceSection')
//       }).catch(() => {
//         res.status(400).send('This item has not been saved to database')
//       });
//   })
  




// app.use(bodyParser.urlencoded({extended:true}));
app.use('/public', express.static(__dirname + '/public'))
app.use('/img', express.static(__dirname + '/img'))
app.use('/views', express.static(__dirname + '/views'))

// app.use('views', path.join(__dirname, 'views'));

app.get('/', function (req, res) {
  res.render('home')
})

app.get('/about_Section', function (req, res) {
  res.render('about_Section')
})

app.get('/serviceSection', function (req, res) {
  res.render('serviceSection')
})
app.get('/contact', function (req, res) {
  res.render('contact')
})

app.post('/contactdbs', function (req, res) {
  var myData = new Contact(req.body)
  console.log(myData)
  myData.save().then(() => {
      res.send('This item has been saved to database')
    }).catch(() => {
      res.status(400).send('This item has not been saved to database')
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
