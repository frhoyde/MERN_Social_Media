import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signIn = (req, res) => {

};

export const signUp = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;

    try {
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            res.status(400).json({message: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`});

        const token = jwt.sign({ email: result.email, id: result._id}, secret, {expiresIn: "1h"});

        res.status(201).json({result, token});
    } catch (error) {
        res.status(500).json({message: "Something Went Wrong"});
    }

}