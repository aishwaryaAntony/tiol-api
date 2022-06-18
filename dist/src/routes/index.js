'use strict';

var _constants = require('../helpers/constants');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require('express');
var router = express.Router();

const mongodb = require('mongodb');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'TIOL-API' });
});

router.get('/image/:bucket/:filename', (req, res, next) => {
	try {
		const { q, h } = req.query;
		const { bucket, filename } = req.params;
		const bucketName = _constants.COLLECTION_NAME[bucket];
		// console.log("Query ==> "+q+" == Filename ==> "+filename)
		if (filename !== undefined && filename !== null) {
			const extension = _path2.default.extname(filename) !== "" ? _path2.default.extname(filename).substring(1) : null;
			const contentType = _constants.CONTENT_TYPES[extension];

			if (contentType !== undefined && contentType !== null) {
				res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': 'public, max-age=3600' });
			} else {
				res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
			}
			mongodb.MongoClient.connect(_constants.URI, { useNewUrlParser: true, useUnifiedTopology: true }, function (error, client) {
				_assert2.default.ifError(error);

				const db = client.db(_constants.DB_NAME);
				const mongoBucket = new mongodb.GridFSBucket(db, {
					bucketName: bucketName
				});

				let downloadStream = mongoBucket.openDownloadStreamByName(filename);
				downloadStream.on('error', function (error) {
					// assert.ifError(error);                    
					console.log("Error at attachments downloadStream ===> " + error);
					var readStream = _fs2.default.createReadStream(_path2.default.resolve(__dirname, '../../uploads/tiol_logo.png'));
					// res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
					readStream.pipe(res);
				});
				downloadStream.on('finish', function (data) {
					console.log('done! => ' + data);
					// process.exit(0);
				});

				downloadStream.pipe(res);
				// let height = h !== undefined ? parseInt(h) : null;
				// if (q !== undefined) {
				// 	const transform = sharp().resize(parseInt(q), height, {
				// 		fit: "cover"
				// 	}).toFormat(extension, {
				// 		quality: 100
				// 	});

				// 	// const transform = sharp().toFormat(extension, {
				// 	//     quality: 30
				// 	// });

				// 	// res.set('Content-Type', contentType );
				// 	downloadStream.pipe(transform).pipe(res);
				// } else {
				// 	downloadStream.pipe(res);
				// }

				// const transform = sharp().resize(1300, 300, {
				//     fit: "cover"
				// }).toFormat(extension, {
				//     quality: 85
				// });

				// const transform = sharp().toFormat(extension, {
				//     quality: 30
				// });

				// res.set('Content-Type', contentType );
				// downloadStream.pipe(transform).pipe(res);
			});
		} else {
			var readStream = _fs2.default.createReadStream(_path2.default.resolve(__dirname, '../../uploads/tiol_logo.png'));
			// res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
			readStream.pipe(res);
		}
	} catch (error) {
		console.log("Error at attachments catch block ===> " + error);
		var readStream = _fs2.default.createReadStream(_path2.default.resolve(__dirname, '../../uploads/tiol_logo.png'));
		readStream.pipe(res);
	}
});

module.exports = router;