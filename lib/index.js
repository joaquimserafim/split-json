'use strict';

var os = require('os');
var through = require('through-tuga');

module.exports  = split;
split.split     = split;
split.JSONValid = JSONValid;
split.isObject  = isJSObject;

function JSONValid(str) {
  try {
    return JSON.parse(str);
  } catch (ex) {
    return null;
  }
}

function isJSObject(obj) {
  return obj === Object(obj) && !Array.isArray(obj);
}

function split(match, encoding, replace) {
  var cache = [];
  var isJson = false;

  match = match || new RegExp(os.EOL);
  encoding = encoding || 'utf8';

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

  function run(chunk, enc, cb) {
    // buffer then convert to string
    var str = chunk.toString(encoding);

    // or chunk of data
    // but first check if any delimiters to be removed at begin or end

    if (replace) {
      str = str.replace(replace, '');
    }

    var array = str.split(match);

    for (var i = 0; i < array.length; i++) {
      var json = JSONValid(cache.join('') + array[i]);

      if (json) {
        isJson = true;
        /*jshint validthis:true*/
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
  }

  return through({objectMode: false}, run);
}
