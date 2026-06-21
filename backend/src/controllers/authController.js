import User from "../models/user.js";

export const registerUser = async (req, res) => {
    // res.send("Register User");
    try {
        const user = await User.create(req.body);
        console.log(req.body);

        res.status(201).json({
            success: true,
            user
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