const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const cors = require('cors')

const db = require('./database')
const clarifaiApp = require('./faceDetect')

const home = require('./controllers/home')
const register = require('./controllers/register')
const signin = require('./controllers/sigin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')


const PORT = 3001
const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get('/', home.getHome(db))
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfileGet(db))
app.post('/image/facedetect', image.handleClarifaiPredict(clarifaiApp))
app.put('/image', image.handleImage(db))

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
})