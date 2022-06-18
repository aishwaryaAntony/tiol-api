import dotenv from 'dotenv'
dotenv.config();

const config = {
    REFERRAL_CODE_LENGTH: process.env.REFERRAL_CODE_LENGTH,
    JWT_CONFIG: {
        secret: process.env.JWT_PRIVATE_KEY,
        options: {
            algorithm: "HS256",
            expiresIn: "6h"
        }
    },
    REFRESH_TOKEN: {
        secret: process.env.JWT_PRIVATE_KEY,
        options: {
            algorithm: "HS256",
            expiresIn: "12h"
        }
    },
}

module.exports = config;