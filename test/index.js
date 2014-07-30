var fs = require('fs');
var assert = require('assert');

var split = require('../');


var rs0 = fs.createReadStream('./test/file0.json');
var rs1 = fs.createReadStream('./test/file1.json');


var testPlans = 2000;

console.log('# tests number: ' + testPlans);
console.log();

function a (cb) {
  console.log('first test - stream a with single JSON data separate by "\\r"');

  rs0.pipe(split(/\r/))
  .on('data', function (doc) {
    --testPlans;
    assert.strictEqual(typeof split.JSONValid(doc), 'object', doc);
  })
  .on('end', function () {
    cb(testPlans > 1000 ? 'fail in some test' : null, 
      'finish first test - ' + 
      testPlans + ' to go');
  });
}

function b (cb) {
  console.log('second test - stream file with a big JSON');

  rs1.pipe(split(/\n,\n/, 'utf8', /(^\[\n)|(\n\]\n$)/))
  .on('data', function (doc) {
    --testPlans;
    assert.strictEqual(typeof split.JSONValid(doc), 'object', doc);
  })
  .on('end', function () {
    cb(testPlans > 0 ? 'fail in some test' : null, 
      'finish second test - ' + testPlans + ' to go');
  });
}

var tests = [a, b];

function async (test) {

  if (!test) return;

  test(function (err, msg) {
    if (err) throw err;

    console.log(msg);
    console.log();

    async(tests.shift());
  });
}

// start tests
async(tests.shift());
