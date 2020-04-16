
const Clarifai = require('clarifai')

const clarifaiApp = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY
});

module.exports = clarifaiApp