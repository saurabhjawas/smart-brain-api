const handleRegister =  (db, bcrypt) => async (req, res) => {
  
  const {name, email, password} = req.body

  try {
    const hash = await bcrypt.hash(password,10)

    await db.transaction(async trx => {
      const loginEmailArr = await trx('login').returning('email')
      .insert({ hash, email })

      const loginEmail = loginEmailArr[0]

      // console.log(loginEmail);
      const userArr = await trx('users').returning('*')
      .insert({
        email,
        name,
        joined: new Date()
      })

      const user = userArr[0]

      // console.log(user);      
      res.json(user)
    })

  } catch (error) {
    // console.log('Rollback catch block', error);
    res.status(400).json("Could not register user")
  }
}


module.exports = { handleRegister }