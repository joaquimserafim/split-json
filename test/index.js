var fs = require('fs');
var test = require('tape');

var split = require('../');


var rs = fs.createReadStream('./test/file.json');

 
test('file stream', function (t) {
  t.plan(10000);

  split(rs, function (err, data) {
    t.ok(typeof data === 'object', JSON.stringify(data));
  });
});