import multer from "multer";
import path from "path";
import db from "../models";
const assert = require('assert');
const mongodb = require('mongodb');
import { URI, DB_NAME } from "../helpers/constants";
const fs = require('fs');
// import sharp from "sharp";

const storageLocal = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + "" + path.extname(file.originalname))
    }
})
const upload = multer({ storage: storageLocal });
module.exports = {
    upload: upload,
    addAttachment: (fileObj, bucketName, recordId, foreignKeyId) => {
        return new Promise((resolve, reject) => {
            try {
                const { filename, contentType, mimetype, originalname, size } = fileObj;
                mongodb.MongoClient.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }, async function (error, client) {
                    assert.ifError(error);

                    const mongoDBName = client.db(DB_NAME);
                    const mongoBucket = new mongodb.GridFSBucket(mongoDBName, {
                        bucketName: bucketName
                    });

                    const extension = path.extname(filename) !== "" ? path.extname(filename).substring(1) : null;
                    let content_type = contentType !== undefined ? contentType : mimetype;
                    let filePath = path.resolve(__dirname, `../../uploads/${filename}`);
                    var readStream = fs.createReadStream(filePath);
                    let uploadStream = mongoBucket.openUploadStream(filename, { contentType: content_type });

                    // console.log("Id ==> " + uploadStream.id + " ===> ContentType ===> "+content_type);
                    let mongoId = uploadStream.id.toString();
                    // console.log("Id ==> " + uploadStream.id.toString() + " ===> ");
                    uploadStream.on('error', function (error) {
                        // assert.ifError(error);                    
                        console.log("Error at attachments " + error);

                    })
                    uploadStream.on('finish', function (data) {
                        // console.log('done! => ' + JSON.stringify(data));
                    });

                    // Writes data in to mongo db
                    readStream.pipe(uploadStream);

                    // optimizes and writes data in to mongodb
                    // if (extension !== 'svg' && extension !== 'xlsx' && extension !== 'pdf') {
                    //     const transform = sharp().toFormat(extension, {
                    //         quality: 30
                    //     });

                    //     readStream.pipe(transform).pipe(uploadStream);
                    // } else {
                    //     readStream.pipe(uploadStream);
                    // }

                    // let uploadedAttachmentData = null;
                    // console.log("Record Id ===> " + recordId);
                    switch (bucketName) {
                        case 'juries':
                            await db.Jury.update({
                                file_name: filename,
                                mongo_id: mongoId
                            }, {
                                where: {
                                    id: recordId
                                }
                            })
                            fs.unlink(filePath, (err) => {
                                if (err) return console.log(err);
                                console.log('file deleted successfully for juries');
                            });
                            break;
                        case 'banners':
                            await db.Banner.update({
                                attachment_name: filename,
                                mongo_id: mongoId
                            }, {
                                where: {
                                    id: recordId
                                }
                            })
                            fs.unlink(filePath, (err) => {
                                if (err) return console.log(err);
                                console.log('file deleted successfully');
                            });
                            break;
                        case 'blogs':
                            await db.Blog.update({
                                file_name: filename,
                                mongo_id: mongoId
                            }, {
                                where: {
                                    id: recordId
                                }
                            })
                            fs.unlink(filePath, (err) => {
                                if (err) return console.log(err);
                                console.log('file deleted successfully');
                            });
                            break;
                        case 'galleries':
                            await db.GalleryAttachment.update({
                                attachment_type: content_type,
                                attachment_name: filename,
                                mongo_id: mongoId
                            }, {
                                where: {
                                    id: recordId
                                }
                            })
                            fs.unlink(filePath, (err) => {
                                if (err) return console.log(err);
                                console.log('file deleted successfully');
                            });
                            break;
                        default:
                            break;
                    }
                    resolve(filename);
                });
            } catch (error) {
                reject(error);
            }
        });
    },

    deleteAttachment: (bsonId, bucketName) => {
        return new Promise((resolve, reject) => {
            mongodb.MongoClient.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }, function (error, client) {
                assert.ifError(error);

                const mongoDBName = client.db(DB_NAME);
                const bucket = new mongodb.GridFSBucket(mongoDBName, {
                    bucketName: bucketName
                });
                // console.log("bsonId ====> called "+ bsonId)
                let id = new mongodb.ObjectId(bsonId);

                bucket.delete(id, function (err) {
                    if (err) {
                        return resolve('failed');
                    }
                    resolve('success');
                });
            });
        });
    }
}