import jwt from "jsonwebtoken";

export const protect = ((req, res, next) => {
    try {
        console.log(req.header());
        const authHeader = req.header("Authorization");

        console.log(authHeader);

        if (!authHeader) {
            res.status(401).json({
                success: false,
                message: "No token found"
            });
        }

        const token = authHeader.split(" ")[1];

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        req.usedID = decoded.id;

        next();

    } catch(error){
        res.status(401).json({
            success: false,
            message: "Invalid token"
        })
    }
});