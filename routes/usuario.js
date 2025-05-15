import express from 'express';
import { registerUser, loginUser } from '../controllers/usuario.js'

const router = express.Router()

router.post('/user', registerUser)
router.post('/user/login', loginUser)

export default router