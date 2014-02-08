var os = require('os');
var Stream = require('stream'); 
var through = require('through');


module.exports = split;

split.split = split;
split.JSONValid = JSONValid;

function JSONValid (str) {
  try {
    return JSON.parse(str);
  } catch (err) {
    return null;
  }
}

var cache = '';

function split (stream, match, cb) {
  if (stream instanceof Stream) {
    if (typeof match === 'function') {
      cb = match;
      match = os.EOL;
    }

    if (!cb) cb = function () {};

    function cb_data (data) {
      var json = JSONValid(data);
      return cb(!json && new Error('Uncaught Error: invalid json structure!!'), json);
    }

    //stream to split-json inself (through pipe) and use callback to return
    stream.pipe(split(match)).on('data', cb_data);
  }

  function write (data) {
    var first = 0;
    var num_first = 0;
    if (Buffer.isBuffer(data)){
      // can passa a match and will be in stream arg
      var str = data.toString('utf8').replace(/(^\[\n)|(\n\]\n$)/, '');
      var array = str.split(stream || os.EOL);

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

    } else if (typeof data === 'object') {
      if (!data) return this.emit('end');
      this.emit('data', JSON.stringify(data));
    } else {
      return null;
    }
  }
    
  // through pipe
  return through(write);
}