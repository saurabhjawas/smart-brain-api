const handleProfileGet = (db) => (req, res) => {
  const { id } = req.params

  db.select('*').from('users').where({ id }).then(user => {
    // console.log(user);
    if (user.length > 0) {
      res.json(user[0])      
    } else {
      res.status(404).json("No user found")
    }
  }).catch(err => {
    res.status(400).json("Unable to process request")
  })
}

module.exports = {
  handleProfileGet
}