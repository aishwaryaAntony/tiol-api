import jwt from "jsonwebtoken";
import db from "../models/index";
import { JWT_CONFIG } from "../../config/config";

module.exports = async (req, res, next) => {
    try {
        const headers = req.headers;
        if (headers.hasOwnProperty('authorization')) {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, JWT_CONFIG.secret);
            req.userData = decoded;
            // console.log('Data ==> '+ JSON.stringify(decoded))
            // To check whether the current user is autorized and correct user
            if (Object.keys(decoded).length > 0) {
                let fetchUser = await db.User.findOne({ where: { id: decoded.user_id, email: decoded.email } });
                // console.log('User ==> '+ JSON.stringify(fetchUser))
                if (fetchUser === null) {
                    return res.status(200).json({
                        status: 'failed',
                        message: 'Auth failed'
                    });
                }
            } else {
                return res.status(401).json({
                    status: 'failed',
                    message: 'Auth failed'
                });
            }
            next();
        } else {
            return res.status(401).json({
                status: 'failed',
                message: 'Auth failed'
            });
        }
    } catch (error) {
        console.log('Error at check auth middleware ' + error)
        return res.status(401).json({
            status: 'failed',
            message: 'Auth failed'
        });
    }
}