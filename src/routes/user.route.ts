import express from 'express';
import { validateToken, register, login, getAllUsers } from '../controllers/user.controller';

const router = express.Router();

router.get('/validate', validateToken);
router.post('/register', register);
router.post('/login', login);
router.get('/users', getAllUsers);

export = router;