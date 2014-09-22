var fs = require('fs');
var test = require('tape');

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
