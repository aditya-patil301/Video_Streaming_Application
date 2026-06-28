import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import User from "../models/user.js";

export const registerUser = async (req, res) => {
    // res.send("Register User");
    try {
        const { name, username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            username,
            password: hashedPassword
        });
        console.log(req.body);

        res.status(201).json({
            success: true,
            message: "User registered successfully."
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            email
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        } 

        const token = jwt.sign(
            { id: user._id},
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }

        );

        res.status(200).json({
            success: true,
            token
        });


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};