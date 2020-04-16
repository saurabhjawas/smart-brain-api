
const handleClarifaiPredict = (clarifaiApp) => (req, res) => {
  const { imageUrl } = req.body

  clarifaiApp.models.predict(
    Clarifai.FACE_DETECT_MODEL, 
    imageUrl /* this.state.input */
  ) 
  .then(responseData => {
    const faceBoxRegions = responseData.outputs[0].data.regions
    const boundingBoxArr = faceBoxRegions.map(region => region.region_info.bounding_box)
    // console.log(boundingBoxArr);
    res.json(boundingBoxArr)
  })
  .catch(err => {
    console.log(`Clarifai API issue; ${err}`);
    res.status(400).json({faceDetectError: 'Unable to detect faces'})
  }) 
}


const handleImage = (db) => (req, res) => {  
  const { id } = req.body

  db('users').where('id', '=', id )
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    // console.log(entries);
    if (entries.length > 0) {
      res.json({ entries: entries[0] })
    } else {
      res.status(404).json("no matching user was found")
    }    
  })
  .catch(err => {
    res.status(400).json('Error updaing enties for user')
  })
}

module.exports = {
  handleImage,
  handleClarifaiPredict
}