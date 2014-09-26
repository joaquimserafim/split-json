var fs = require('fs');
var test = require('tape');
var Readable = require('stream').Readable;

var split = require('../');

test('stream some json objects', function(assert) {
  fs.createReadStream('./test/some_json_stream.txt')
    .pipe(split(/\r/))
    .on('data', function(doc) {
      assert.deepEqual(typeof doc, 'object');
    })
    .on('end', assert.end);
});

test('stream a with single JSON data separate by "\\r"', function(assert) {
  fs.createReadStream('./test/file0.json')
    .pipe(split(/\r/))
    .on('data', function(doc) {
      assert.deepEqual(typeof doc, 'object');
    })
    .on('end', assert.end);
});

test('stream file with a big JSON', function(assert) {
  fs.createReadStream('./test/file1.json')
    .pipe(split(/\n,\n/, 'utf8', /(^\[\n)|(\n\]\n$)/))
    .on('data', function(doc) {
      assert.deepEqual(typeof doc, 'object');
    })
    .on('end', assert.end);
});

test('single JS Object & use split.isObject to test is a JS object',
function(assert) {
  var obj = {type: 2000, tmx: 0, rss: 0, heapTotal: 0, heapUsed:0};
  var rs = new Readable();
  rs.push(JSON.stringify(obj));
  rs.push(null);

  rs.pipe(split(/\r/))
    .on('data', function(doc) {
      assert.deepEqual(split.isObject(doc), true);
    })
    .on('end', assert.end);
});

test('testing split arguments not passing the match -' +
  'match === "string"',
function(assert) {
  var obj = {type: 2000, tmx: 0, rss: 0, heapTotal: 0, heapUsed:0};
  var rs = new Readable();
  rs.push(JSON.stringify(obj));
  rs.push(null);

  rs.pipe(split('ascii'))
    .on('data', function(doc) {
      assert.deepEqual(split.isObject(doc), true);
    })
    .on('end', assert.end);
});

test('testing split arguments - ' +
  'passing match & replace' +
  'match instanceof RegExp && typeof encoding !== "string"',
function(assert) {
  fs.createReadStream('./test/test_args_1.txt')
    .pipe(split(/\n/, /(^\[\n)|(\n\]\n$)/))
    .on('data', function(doc) {
      assert.deepEqual(split.isObject(doc), true);
    })
    .on('end', assert.end);
});
