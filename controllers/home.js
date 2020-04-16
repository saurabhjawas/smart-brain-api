const getHome = (db) => async (req, res) => {
  try {
    const nameObjArr = await db('users').select('name')
    const nameArr = nameObjArr.map((nameObj) => nameObj.name)
    res.json(nameArr)    

  } catch (error) {
    console.log(error);
    res.status(400).json('could not fetch usernames')
  }
}

module.exports = {
  getHome
}