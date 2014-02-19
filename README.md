# split-json

<a href="https://nodei.co/npm/split-json/"><img src="https://nodei.co/npm/split-json.png?downloads=true"></a>

[![Build Status](https://travis-ci.org/joaquimserafim/split-json.png?branch=master)](https://travis-ci.org/joaquimserafim/split-json)

<img src="https://david-dm.org/joaquimserafim/split-json.png">

split JSON was sent through some kind of readable stream in JSON objects



**V1.5**

### API


    stream.pipe(split_json([match], [encoding], [replace]))
    .on('data', function (data) {
        console.log(split_json.JSONValid(data))
    })
    
    [match]    => RegExp, default to os.EOL
    [encoding] => String, utf8/ascii, default to utf8
    [replace]  => RegExp, enable you to remove some delimiters at begin and end of a big JSON file
        ex: /(^\[\n)|(\n\]\n$)/
        
        
    // some emitters
    on('data', callback(data))
    on('end', [callback]);
    
    
    // validates JSON, instead to use JSON.parse inside of a try/catch
    split_json.JSONValid -> null in case of error, if ok return the object
    
    
    // check is a valid Object
    split_json.isObject(obj) -> true/false
    


### Examples

    // from file

    var rs = fs.createReadStream('./test/file1.json')
    rs.pipe(split_json([match])).on('data', callback)
        
        
    
    // from mongoDB
    
    var mongojs = require('mongojs');
    var split_json = require('split-json');

    var db = mongojs('str_conn');
    var collection = db.collection('my_coll');

   	collection.find({})
    .pipe(split_json())
    .on('data', function (doc) {
        console.log(doc);
    })
    .on('end', function () {
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
