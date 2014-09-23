var fs = require('fs');
var test = require('tape');
var Readable = require('stream').Readable;

var split = require('../');

test('#stream a with single JSON data separate by "\r"', function(assert) {
  fs.createReadStream('./test/file0.json')
    .pipe(split(/\r/))
    .on('data', function(doc) {
      assert.deepEqual(typeof doc, 'object');
    })
    .on('end', assert.end);
});

test('#stream file with a big JSON', function(assert) {
  fs.createReadStream('./test/file1.json')
    .pipe(split(/\n,\n/, 'utf8', /(^\[\n)|(\n\]\n$)/))
    .on('data', function(doc) {
      assert.deepEqual(typeof doc, 'object');
    })
    .on('end', assert.end);
});

test('#a single JS Object & use split.isObject to test is a JS object',
function(assert) {
  var obj = {type: 2000, tmx: 0, rss: 0, heapTotal: 0,heapUsed:0};
  var rs = new Readable();
  rs.push(JSON.stringify(obj));
  rs.push(null);

  rs.pipe(split(/\r/))
    .on('data', function(doc) {
      assert.deepEqual(split.isObject(doc), true);
    })
    .on('end', assert.end);
});
