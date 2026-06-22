import bcrypt from "bcrypt";
import User from "../models/user.js";

export const registerUser = async (req, res) => {
    // res.send("Register User");
    try {
        const {name, username, email, password} = req.body;
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

    } catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const loginUser = (req, res) => {
    res.send("Login User");
};