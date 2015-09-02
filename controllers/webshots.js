var fs = require('fs');
var webshot = require('webshot');
var AWS = require('aws-sdk');

var config = require('../config');

var s3 = new AWS.S3();

module.exports = function(req, res, next) {
  var key;
  var invalid = false;
  var id = req.originalUrl.substring(1);
  var file_path = './public/images/' + id + config.file_type;

  var param0 = req.body.param0;
  var param1 = req.body.param1;
  var param2 = req.body.param2;
  var param3 = req.body.param3;

  var html = config.html([param0, param1, param2, param3]);

  function createWebshot(html, file_path, callback) {
    webshot(html, file_path, config.options, function(err) {
      if (err) return next(new Error(err));
      console.log('Webshot created');
      if (config.bucket) {
        console.log('Saving image to S3');
        callback();
      } else {
        console.log('No bucket specified');
        res.end();
      }
    });
  };

  function saveToS3() {
    fs.readFile(file_path, function(err, data) {
      if (err) return next(new Error(err));
      s3.putObject({
        Bucket: config.bucket,
        Key: 'images/' + id + config.file_type,
        Body: data,
        ACL: 'public-read'
      }, function(err) {
        if (err) return next(new Error(err));
        console.log('Image saved to S3');
        res.end();
      });
    });
  };

  for (key in req.body) {
    if (config.accepted_values.indexOf(req.body[key]) === -1) {
      invalid = true;
      console.log('Invalid submission: ' + req.body[key])
      return next(new Error('Invalid submission'));
    }
  }

  if (!invalid) {
    createWebshot(html, file_path, saveToS3)
  }

};