var os = require('os');
var binSplit = require('binary-split');
var JSONStream = require('JSONStream');


module.exports = split;

function split (stream, match, cb) {
  if (typeof match === 'function') {
    cb = match;
    match = new Buffer(os.EOL);
  }

  stream.pipe(binSplit(match))
    .pipe(JSONStream.parse())
    .on('data', function cb_data (data) {
      if (Array.isArray(data)) {
        for (var key in data)
          cb(null, data[key]);
      } else if (typeof data === 'object') {
        cb(null, data);
      }
    }).on('error', function cb_error (err) {
      cb(err);
    });
}