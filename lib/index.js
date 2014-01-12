var os = require('os');
var JSONStream = require('JSONStream');
var split = require('split');
var Stream = require('stream');
var through = require('through');

module.exports = splitJSON;

var cache = '';

function splitJSON (stream, match, cb) {
  
  function JSONValid (str) {
    try {
      return JSON.parse(str);
    } catch (err) {
      return null;
    }
  }


  if (stream instanceof Stream) {
    if (typeof match === 'function') {
      cb = match;
      match = os.EOL;
    }

    if (!cb) throw 'Uncaught Error: must provide an callback!!';

    stream.pipe(split(match))
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
  } else {
    return through(function write (data) {
      var res = null;

      if (Buffer.isBuffer(data)){
        // can passa a match and will be in stream arg

        res = data.toString('utf8').replace(/^\[/, '').replace(/\n\]\n?/, '');
        var array = res.split(stream || os.EOL);

        for (var i = 0; i < array.length; i++) {
          var json = JSONValid(cache + array[i]);

          if (json) {
            cache = '';
            this.emit('data', JSON.stringify(json));
            continue;
          }
          // keep data in ram for next interaction
          cache += array[i];
        }

      } else {
        res = data.replace(/^\[/, '').replace(/\n\]\n?/, '').replace(/\n,\n/g, '');
        if (!res) return this.emit('end');
        this.emit('data', res);
      }

    }, function end () {
      this.emit('end');
    });
  }
}