'use strict'

var fs        = require('fs')
var test      = require('tape')
var Readable  = require('stream').Readable

var split = require('../')

test('stream some bad formated json file', function(assert) {
  fs.createReadStream(__dirname + '/fixtures/some_json_stream.txt')
    .pipe(split(/\r/))
    .on('data', function(doc) {
      assert.deepEqual(typeof doc, 'object')
    })
    .on('end', assert.end)
})

test('a stream with single JSON data separate by "\\r"', function(assert) {
  fs.createReadStream(__dirname + '/fixtures/file0.json')
    .pipe(split(/\r/))
    .on('data', function(doc) {
      assert.deepEqual(typeof doc, 'object')
    })
    .on('end', assert.end)
})

test('stream file with a big JSON', function(assert) {
  fs.createReadStream(__dirname + '/fixtures/file1.json')
    .pipe(split(/\n,\n/, 'utf8', /(^\[\n)|(\n\]\n$)/))
    .on('data', function(doc) {
      assert.deepEqual(typeof doc, 'object')
    })
    .on('end', assert.end)
})

test('stream file with a oneline JSON Array', function(assert) {

  var replaceChunk = function(chunk) {
    return chunk.replace(/(\{*)(.*)(\}*)/, '{$2}');
  };

  fs.createReadStream(__dirname + '/fixtures/oneLineJson.json')
    .pipe(split(/\},{/, 'utf8', /(^\[)|(\]$)/, replaceChunk))
    .on('data', function(doc) {
      assert.deepEqual(typeof doc, 'object')
    })
    .on('end', assert.end)
})

test('single JS Object & use split.isObject to test is a JS object',
function(assert) {
  var obj = {type: 2000, tmx: 0, rss: 0, heapTotal: 0, heapUsed:0}
  var rs = new Readable()
  rs.push(JSON.stringify(obj))
  rs.push(null)

  rs.pipe(split(/\r/))
    .on('data', function(doc) {
      assert.deepEqual(split.isObject(doc), true)
    })
    .on('end', assert.end)
})

test('testing split arguments not passing the match -' +
  'match === "string"',
function(assert) {
  var obj = {type: 2000, tmx: 0, rss: 0, heapTotal: 0, heapUsed:0}
  var rs = new Readable()
  rs.push(JSON.stringify(obj))
  rs.push(null)

  rs.pipe(split('ascii'))
    .on('data', function(doc) {
      assert.deepEqual(split.isObject(doc), true)
    })
    .on('end', assert.end)
})

test('testing split arguments - passing match & replace' +
  'match instanceof RegExp && typeof encoding !== "string"',
function(assert) {
  fs.createReadStream(__dirname + '/fixtures/test_args_1.txt')
    .pipe(split(/\n/, /(^\[\n)|(\n\]\n$)/))
    .on('data', function(doc) {
      assert.deepEqual(split.isObject(doc), true)
    })
    .on('end', assert.end)
})

test('split strings', function(assert) {
  var i = 0

  fs.createReadStream(__dirname + '/fixtures/file_strings.txt')
  .pipe(split())
  .on('data', function(data) {
    assert.equal(typeof data, 'string')
    if (i++ === 0) {
      assert.deepEqual('Hello World', data)
    } else if (i === 1) {
      assert.deepEqual('Felix the cat', data)
      assert.end()
    }
  })
  .on('error', assert.fail)
  .on('end', assert.end)
})

test('stream objects should pass', function(assert) {
  var obj = {type: 2000, tmx: 0, rss: 0, heapTotal: 0, heapUsed:0}
  var rs = new Readable()
  rs.push(JSON.stringify(obj))
  rs.push(null)

  rs.pipe(split.obj())
    .on('data', function(doc) {
      assert.deepEqual(split.isObject(doc), true)
    })
    .on('end', assert.end)
})
