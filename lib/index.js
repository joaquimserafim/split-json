var through = require('through');
var JSONhandler = require('./json_handler');

module.exports = split;

function split (stream, encoding, cb) {
  var cache = '';

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = 'ascii';
  }

  if (!cb) throw new Error('must pass a callback to retrieve data!!!');

  function run (stream, encoding, cb) {
    var handleStream = through(function (buffer) {
      var data = buffer.toString(encoding);
      var split = data.split(/\r|\n/);
      
      split.forEach(function (line, i) {
        if (cache) {
          line = cache + line;
          // reset cache
          cache = '';
        }

        // if is a valid JSON object will return the object and send through the callback
        // if not return null and put the string in cache for the next operation
        var valid = JSONhandler.parse(line);

        if (valid) {
          cb(null, valid);
        } else {
          cache = line;
        }
      });
    });

    stream.pipe(handleStream);
  }

  run(stream, encoding, cb);
}