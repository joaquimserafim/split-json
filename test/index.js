var fs = require('fs');
var test = require('tape');

var JSONhandler = require('../lib/json_handler');
var split = require('../');

var rs = fs.createReadStream('./test/file.json');
 
test('file stream', function (t) {
  t.plan(10000);

  split(rs, 'ascii', function (err, data) {
    t.ok(typeof data === 'object', JSONhandler.stringify(data));
  });
});