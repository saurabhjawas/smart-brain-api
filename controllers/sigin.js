const handleSignin = (db, bcrypt) => async (req, res) => {
  try {  
    const { email, password } = req.body

    const infoArr = await db.select(['users.*','login.hash'])
    .from('users').innerJoin('login', 'users.email', 'login.email')
    .where('login.email', '=' , email)

    if (infoArr.length === 0) {
      throw new Error("no matching login info found")
    }

    const { hash , ...user } = infoArr[0]

    const passwordMatch = await bcrypt.compare(password, hash)

    if (!passwordMatch) {
      throw new Error("no matching login info found")
    }

    res.json({ signInStatus: "SIGNIN_SUCCESS", user })
  } catch (error) {
    res.status(404).json({
      signInStatus: "SIGNIN_FAILURE",
      message: error.toString()
    })
  }
}

module.exports = {
  handleSignin
}