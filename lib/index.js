var through = require('through');
var JSONhandler = require('./json_handler');

var JSONStream = require('JSONStream');

//rs.pipe(JSONStream.stringify('[\n', '\n,\n', '\n]\n'), JSONStream.parse()).pipe(process.stdout);


var cache = '';

module.exports = function split (stream, encoding, cb) {
  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = 'ascii';
  }
  
  if (!cb) throw new Error('must pass a callback to retrieve data!!!');

  function run (stream, encoding, cb) {
    var handleStream = through(function (buffer) {
      var data = buffer.toString(encoding);

      if (/^\[\n/.test(data) || /\n\]\n?/.test(data)) {
        return;
      }

      data = data.replace(/\n,\n/g, '\n');

      var split = data.split(/\r|\n/);

      split.forEach(function (line, i) {
        if (cache) {
          line = cache + line;
          // reset cache
          cache = '';
        }

        console.log(i, line);
        return ;
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
};