var os = require('os');
var through = require('through-tuga');

module.exports = split;
split.split = split;
split.JSONValid = JSONValid;
split.isObject = isObject;

function JSONValid (str) {
  try {
    return JSON.parse(str);
  } catch (ex) {
    return null;
  }
}

function isObject (obj) {
  return obj === Object(obj) && !Array.isArray(obj);
}

var cache = [];

function split (match, encoding, replace) {
  // check args
  if (typeof match === 'string') {
    encoding = match;
    match = os.EOL;
  }

  if (match instanceof RegExp && typeof encoding !== 'string') {
    replace = encoding;
    encoding = 'utf8';
  }

  if (!(replace instanceof RegExp)) {
    replace = null;
  }

  return through({objectMode: false}, function run (chunk, enc, cb) {
    // buffer then convert to string
    var str = Buffer.isBuffer(chunk) && chunk.toString(encoding) || chunk;

    // can be an object
    if (isObject(str)) {
      this.emit('data', str);
      return cb();
    }

    // or chunk of data
    // but first check if any delimiters to be removed at begin or end

    if (replace) {
      str = str.replace(replace, '');
    }

    var array = str.split(match);

    for (var i = 0; i < array.length; i++) {
      var json = JSONValid(cache.join('') + array[i]);

      if (json) {
        this.emit('data', json);
        // reset cache
        if (cache.length) {
          cache = [];
        }

        continue;
      }

      // keep data in cache for the next interaction
      cache.push(array[i]);
    }

    cb();
  });
}
