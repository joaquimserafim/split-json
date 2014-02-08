# split-json

<a href="https://nodei.co/npm/split-json/"><img src="https://nodei.co/npm/split-json.png?downloads=true"></a>

[![Build Status](https://travis-ci.org/joaquimserafim/split-json.png?branch=master)](https://travis-ci.org/joaquimserafim/split-json)

<img src="https://david-dm.org/joaquimserafim/split-json.png">

split JSON was sent through some kind of readable stream in JSON objects


*Node.js version: >= 0.10*

### Library

    // through callback
    split_json(stream, [match], callback(err, doc))
    
    // [match] default to OS System end Of File
    
    // through pipe
    stream.pipe(split_json([match])).on('data', function (data) {
        console.log(split_json.JSONValid(data))
    })
    
    // validates JSON, instead to use JSON.parse inside of a try/catch
    split_json.JSONValid -> null in case of error, if ok the object
    


### Examples

    // require
    var split_json = require('split-json')

    // CALLBACK
    split_json(stream, [match], callback (err, obj))

    match: optional split argument to specify where to split the data.
           The default is your current operating systems EOL sequence
           (via require('os').EOL).
           

    // PIPE

    var rs = fs.createReadStream('./test/file1.json')
    rs.pipe(split_json([match]*)).on('data', callback)


    // CODE

    // readable stream from file

    var fs = require('fs');
    var split_json = require('split-json');

    var rs = fs.createReadStream('some_file.json');

    split_json(rs, function (err, obj) {
        if (err) throw err;
        console.log(obj);
    });
    
    
    // from mongoDB but now through a pipe

    var mongojs = require('mongojs');
    var split_json = require('split-json');

    var db = mongojs('str_conn');
    var collection = db.collection('my_coll');

   	collection.find({})
      .pipe(split_json())
      .on('data', function (doc) {
        console.log(doc);
      }).on('end', function () {
        db.close();
      });
      
      
    // TCP socket

    on('data', function (data) {
        var rs = new Readable();
        rs.push(data);
        rs.push(null);

        rs.pipe(split_json(/\n/)).on('data', function cb_data (data) {
          cb(null, data);
        });
    });
