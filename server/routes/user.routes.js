import { registerUser, loginUser } from '../controllers/user.controller.js'
import { Router } from 'express'

const userRouter = Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

export default userRouter

// this is a routing mechanism to http://localhost:PORT/api/v1/user/ the given posts to the paths.