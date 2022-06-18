"use strict";

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _index = require("../models/index");

var _index2 = _interopRequireDefault(_index);

var _config = require("../../config/config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = async (req, res, next) => {
    try {
        const headers = req.headers;
        if (headers.hasOwnProperty('authorization')) {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = _jsonwebtoken2.default.verify(token, _config.JWT_CONFIG.secret);
            req.userData = decoded;
            // console.log('Data ==> '+ JSON.stringify(decoded))
            // To check whether the current user is authorized and correct user
            if (Object.keys(decoded).length > 0) {
                let fetchUser = await _index2.default.User.findOne({ where: { id: decoded.user_id, email: decoded.email } });
                // console.log('User ==> '+ JSON.stringify(fetchUser))
                if (fetchUser === null || decoded.role !== 'ADM') {
                    console.log("User is not an admin");
                    return res.status(401).json({
                        status: 'failed',
                        message: 'Auth failed for admin check'
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
        console.log('Error at admin auth middleware ' + error);
        return res.status(401).json({
            status: 'failed',
            message: 'Auth failed'
        });
    }
};