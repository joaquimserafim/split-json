var fs = require('fs');
var test = require('tape');

var split_json = require('../');


var rs0 = fs.createReadStream('./test/file0.json');
var rs1 = fs.createReadStream('./test/file1.json');
 


test('file stream', function (t) {
  t.plan(5000);

  split_json(rs0, /\r/, function (err, doc) {
    if (err) t.error(err !== null, err);
    t.ok(typeof doc === 'object', JSON.stringify(doc));
  });
});

test('pipe file', function (t) {
  t.plan(5000);

  rs1.pipe(split_json(/\n,\n/)).on('data', function (doc) {
    t.pass(doc);
  });
});