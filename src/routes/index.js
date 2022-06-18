var express = require('express');
var router = express.Router();
import { COLLECTION_NAME, CONTENT_TYPES } from "../helpers/constants";
import fs from 'fs';
import path from 'path';
import { URI, DB_NAME } from "../helpers/constants";
import assert from 'assert';
const mongodb = require('mongodb');

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('index', { title: 'TIOL-API' });
});

router.get('/image/:bucket/:filename', (req, res, next) => {
	try {
		const { q, h } = req.query;
		const { bucket, filename } = req.params;
		const bucketName = COLLECTION_NAME[bucket];
		// console.log("Query ==> "+q+" == Filename ==> "+filename)
		if (filename !== undefined && filename !== null) {
			const extension = path.extname(filename) !== "" ? path.extname(filename).substring(1) : null;
			const contentType = CONTENT_TYPES[extension];

			if (contentType !== undefined && contentType !== null) {
				res.writeHead(200, { 'Content-Type': contentType, 'Cache-Control': 'public, max-age=3600' });
			} else {
				res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
			}
			mongodb.MongoClient.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true }, function (error, client) {
				assert.ifError(error);

				const db = client.db(DB_NAME);
				const mongoBucket = new mongodb.GridFSBucket(db, {
					bucketName: bucketName
				});

				let downloadStream = mongoBucket.openDownloadStreamByName(filename);
				downloadStream.on('error', function (error) {
					// assert.ifError(error);                    
					console.log("Error at attachments downloadStream ===> " + error);
					var readStream = fs.createReadStream(path.resolve(__dirname, '../../uploads/tiol_logo.png'));
					// res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
					readStream.pipe(res);
				})
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
			var readStream = fs.createReadStream(path.resolve(__dirname, '../../uploads/tiol_logo.png'));
			// res.writeHead(200, { 'Content-Type': 'image/svg+xml' });
			readStream.pipe(res);
		}

	} catch (error) {
		console.log("Error at attachments catch block ===> " + error);
		var readStream = fs.createReadStream(path.resolve(__dirname, '../../uploads/tiol_logo.png'));
		readStream.pipe(res);
	}
});

module.exports = router;
