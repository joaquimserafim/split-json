'use strict';

var os          = require('os')
var through     = require('through2')
var isRegExp    = require('is-regexp')
var JSONParse   = require('json-parse-safe')
var isJsObject  = require('is-js-object')

module.exports  = split
split.split     = split
split.JSONValid = JSONParse
split.isObject  = isJsObject
split.obj       = splitByObjects

function split (match, encoding, replace, replaceChunk) {
  var cache   = []

  ;match    = match || new RegExp(os.EOL);
  encoding  = encoding || 'utf8'

  if (typeof match === 'string') {
    encoding  = match
    match     = os.EOL
  }

  if (isRegExp(match) && typeof encoding !== 'string') {
    replace   = encoding
    encoding  = 'utf8'
  }

  if (!isRegExp(replace)) {
    replace = null
  }

  function run (chunk, enc, cb) {
    // buffer then convert to string
    var str = chunk.toString(encoding);

    // or chunk of data
    // but first check if any delimiters to be removed at begin or end

    if (replace) {
      str = str.replace(replace, '')
    }

    var array = str.split(match)

    for (var i = 0; i < array.length; i++) {

      if (typeof replaceChunk === 'function') {
        array[i] = replaceChunk(array[i])
      }

      var json = JSONParse(cache.join('') + array[i])

      if (json.value) {
        /*jshint validthis:true*/
        this.emit('data', json.value)
        // reset cache
        if (cache.length) {
          cache.length = 0
        }
        continue
      }

      // keep data in cache for the next interaction
      cache.push(array[i])
    }

    cb()
  }

  return through({objectMode: false}, run)
}

function splitByObjects () {
  function run (obj, enc, cb) {
    cb(null, obj);
  }

  return through({objectMode: true}, run)
}
