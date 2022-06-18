import dotenv from 'dotenv'
dotenv.config();

module.exports = {   
    URI: 'mongodb://localhost:27017',
    DB_NAME: 'tioldb',
    CONTENT_TYPES: {
        jpeg: "image/jpeg",
        jpg: "image/jpeg",
        gif: "image/gif",
        svg: "image/svg+xml",
        svgz: "image/svg+xml",
        png: "image/png",
        pdf: "application/pdf"
    },
    COLLECTION_NAME: {
        jr: 'juries',
        bn: 'banners',
        bl: 'blogs',
        gl: 'galleries'
    },
    JURIES_BUCKET_NAME: 'juries',
    BANNERS_BUCKET_NAME: 'banners',
    BLOGS_BUCKET_NAME: 'blogs',
    GALLERIES_BUCKET_NAME: 'galleries',
    NODE_ENV: process.env.NODE_ENV,
    // NODE_ENV: "production",
    TIOL_EMAIL: "yuvaneshr@kenlasystems.com",
    TIOL_PASS: "yuvaaug2019",
    CLIENT_END_POINT: 'http://localhost:4000/',
    // CLIENT_END_POINT: 'http://206.189.139.104:4000/'
}