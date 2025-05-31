import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/user.model";
import { HTTP_CODE } from "../lib/enum/httpCode";

/**
 * The function `register` handles user registration by hashing the password, creating a new user in
 * the database, generating a JWT token.
 */
export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        if (!firstName) {
            return res.status(HTTP_CODE.BAD_REQUEST).json({ errorMessage: 'First name is required' });
        }
        if (!lastName) {
            return res.status(HTTP_CODE.BAD_REQUEST).json({ errorMessage: 'Last name is required' });
        }
        if (!email) {
            return res.status(HTTP_CODE.BAD_REQUEST).json({ errorMessage: 'Email is required' });
        }
        if (!password) {
            return res.status(HTTP_CODE.BAD_REQUEST).json({ errorMessage: 'Password is required' });
        }

        const user = new UserModel({
            firstName: firstName,
            lastName: lastName,
            email: email.toLowerCase(),
            password: hashedPassword,
            createdDate: new Date(),
        })

        const registeredUser = await user.save();

        if (!registeredUser) {
            return res.status(HTTP_CODE.BAD_REQUEST).json({ errorMessage: 'Registration failed' });
        }

        return res.status(HTTP_CODE.CREATED).json({ message: 'User registered successfully' });

    } catch (error) {
        if (error.code === 11000 || error.code === 11001) {
            return res.status(HTTP_CODE.ALREADY_EXIST).json({ errorMessage: "User already exist" });
        } else {
            return res.status(HTTP_CODE.BAD_REQUEST).json({ errorMessage: 'Registration failed' });
        }
    }
};


/**
 * The login function handles user authentication by checking the email and password, generating access
 */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(HTTP_CODE.BAD_REQUEST).json({ errorMessage: 'Email and password are required' });
        }

        const user = await UserModel.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(HTTP_CODE.NOT_FOUND).json({ errorMessage: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(HTTP_CODE.BAD_REQUEST).json({ errorMessage: 'Incorrect password' });
        }

        const accessToken = jwt.sign({
            userId: user._id,
            email: user?.email,
            firstName: user?.firstName,
            lastName: user?.lastName
        },
            process.env.JWT_SECRET_KEY, {
            expiresIn: '1h',
        });

        return res.status(HTTP_CODE.OK).json({
            message: 'Login successful',
            statusCode: HTTP_CODE.OK,
            data: {
                userId: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                accessToken: accessToken
            }
        })

    } catch (error) {
        return res.status(HTTP_CODE.BAD_REQUEST).json({ errorMessage: 'Incorrect email or password' });
    }
};
