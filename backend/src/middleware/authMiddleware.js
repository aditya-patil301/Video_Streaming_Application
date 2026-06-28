import jwt from "jsonwebtoken";

export const protect = ((req, res, next) => {
    try {
        console.log(req.headers);
        const authHeader = req.header("Authorization");

        console.log(authHeader);

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "No token found"
            });
        }

        const token = authHeader.split(" ")[1];

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decode);

        req.userId = decode.id;

        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message
        });
    }
});