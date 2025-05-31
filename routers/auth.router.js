import express from 'express';
import { login, register } from '../controllers/auth.controller';

const AuthRouter = express.Router();

/* route for user login api */
AuthRouter.post("/login", login);

/* route for user registration api */
AuthRouter.post("/register", register);

export default AuthRouter;
