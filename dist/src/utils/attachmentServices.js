"use strict";

var _multer = require("multer");

var _multer2 = _interopRequireDefault(_multer);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _models = require("../models");

var _models2 = _interopRequireDefault(_models);

var _constants = require("../helpers/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const assert = require('assert');
const mongodb = require('mongodb');

const fs = require('fs');
// import sharp from "sharp";

const storageLocal = _multer2.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, _path2.default.resolve(__dirname, '../../uploads'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + "" + _path2.default.extname(file.originalname));
    }
});
const upload = (0, _multer2.default)({ storage: storageLocal });
module.exports = {
    upload: upload,
    addAttachment: (fileObj, bucketName, recordId, foreignKeyId) => {
        return new Promise((resolve, reject) => {
            try {
                const { filename, contentType, mimetype, originalname, size } = fileObj;
                mongodb.MongoClient.connect(_constants.URI, { useNewUrlParser: true, useUnifiedTopology: true }, async function (error, client) {
                    assert.ifError(error);

                    const mongoDBName = client.db(_constants.DB_NAME);
                    const mongoBucket = new mongodb.GridFSBucket(mongoDBName, {
                        bucketName: bucketName
                    });

                    const extension = _path2.default.extname(filename) !== "" ? _path2.default.extname(filename).substring(1) : null;
                    let content_type = contentType !== undefined ? contentType : mimetype;
                    let filePath = _path2.default.resolve(__dirname, `../../uploads/${filename}`);
                    var readStream = fs.createReadStream(filePath);
                    let uploadStream = mongoBucket.openUploadStream(filename, { contentType: content_type });

                    // console.log("Id ==> " + uploadStream.id + " ===> ContentType ===> "+content_type);
                    let mongoId = uploadStream.id.toString();
                    // console.log("Id ==> " + uploadStream.id.toString() + " ===> ");
                    uploadStream.on('error', function (error) {
                        // assert.ifError(error);                    
                        console.log("Error at attachments " + error);
                    });
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
                            await _models2.default.Jury.update({
                                file_name: filename,
                                mongo_id: mongoId
                            }, {
                                where: {
                                    id: recordId
                                }
                            });
                            fs.unlink(filePath, err => {
                                if (err) return console.log(err);
                                console.log('file deleted successfully for juries');
                            });
                            break;
                        case 'banners':
                            await _models2.default.Banner.update({
                                attachment_name: filename,
                                mongo_id: mongoId
                            }, {
                                where: {
                                    id: recordId
                                }
                            });
                            fs.unlink(filePath, err => {
                                if (err) return console.log(err);
                                console.log('file deleted successfully');
                            });
                            break;
                        case 'blogs':
                            await _models2.default.Blog.update({
                                file_name: filename,
                                mongo_id: mongoId
                            }, {
                                where: {
                                    id: recordId
                                }
                            });
                            fs.unlink(filePath, err => {
                                if (err) return console.log(err);
                                console.log('file deleted successfully');
                            });
                            break;
                        case 'galleries':
                            await _models2.default.GalleryAttachment.update({
                                attachment_type: content_type,
                                attachment_name: filename,
                                mongo_id: mongoId
                            }, {
                                where: {
                                    id: recordId
                                }
                            });
                            fs.unlink(filePath, err => {
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
            mongodb.MongoClient.connect(_constants.URI, { useNewUrlParser: true, useUnifiedTopology: true }, function (error, client) {
                assert.ifError(error);

                const mongoDBName = client.db(_constants.DB_NAME);
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
};