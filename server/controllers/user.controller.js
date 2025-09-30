import { User } from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body
    // check if credentials are properly entered
    if(!name || !email || !password) {
      return res.status(401).json({
        success: false,
        message: 'Incomplete details!'
      })
    }
    // creating an encrypted password for storing in the db
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    //an object to store the deets and add to the db
    const userData = {
      name, 
      email, 
      password: hashedPassword
    }
    // saving in the db
    const newUser = new User(userData)
    const user = await newUser.save()
    // creating a unique token for the new user for session/auth and stuff.
    const token = jwt.sign({
      id: user._id
    }, process.env.TOKEN_SECRET)

    res
    .status(200)
    .json({
      success: true,
      token,
      user: {
        name: user.name
      },
      message: 'User successfully registered!'
    })

  } catch(err) {
    console.log('An error occurred while registration!', err)
    res
    .status(404)
    .json({
      success: false,
      message: err.message
    })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body
    // check if user exists.
    const user = await User.findOne({ email })

    if(!user) {
      return res
      .status(401)
      .json({
        success: false,
        message: 'User does not exist!'
      })
    }
    // if user exists compare the password
    const isMatch = await bcrypt.compare(password, user.password)

    if(isMatch) {
      // correct password so create an access token and return it
      const token = jwt.sign({
        id: user._id
      }, process.env.TOKEN_SECRET)

      return res
      .status(200)
      .json({
        success: true,
        token,
        user: {
          name: user.name
        },
        message: 'User identified and logged in.'
      })

    } else {
      // incorrect password
      return res
      .status(401)
      .json({
        success: false,
        message: 'Invalid Credentials!'
      })
    }

  } catch(err) {
    console.log('There occurred an error while logging in the user', err)
    res
    .status(400)
    .json({
      success: false,
      message: err.message
    })
  }
}


export { registerUser, loginUser }