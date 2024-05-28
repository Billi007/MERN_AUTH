import { Router } from "express";
import cors from 'cors'
import {test, register, login, getProfile} from '../controllers/auth.controller.js'
const router = Router()

router.use(cors({
    credentials: true,
    origin : "http://localhost:5173"
}))

router.get('/', test)
router.post('/register', register)
router.post('/login', login)
router.get('/profile', getProfile)

export default router