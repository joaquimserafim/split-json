# split-json

<a href="https://nodei.co/npm/split-json/"><img src="https://nodei.co/npm/split-json.png"></a>

[![Build Status](https://travis-ci.org/joaquimserafim/split-json.png?branch=master)](https://travis-ci.org/joaquimserafim/split-json)

split JSON was sent through some kind of readable stream into JSON objects



##### CHANGELOG
version 1.0.0 can only split simple objects

    {"n":0,"msg":"Hello World 31de60a3-7cfc-67fb-d41b-383b22377162","tmx":1388775322978}
    {"n":0,"msg":"Hello World 31de60a3-7cfc-67fb-d41b-383b22377162","tmx":1388775322978}
    {"a": [1,2,3,4],"n":0,"msg":"Hello World 31de60a3-7cfc-67fb-d41b-383b22377162","tmx":1388775322978}
    
version 1.1.0 can split with '[\n', '\n', '\n,\n', '\n]\n' (can check more detail in [JSONStream.stringify()](https://npmjs.org/package/JSONStream) :) )
   
    [{"n":0,"msg":"Hello World 31de60a3-7cfc-67fb-d41b-383b22377162","tmx":1388775322978},
    {"n":1,"msg":"Hello World a64d27a8-501d-d7d5-4912-d3dd8ce5cab7","tmx":1388775322979},
    {"n":2,"msg":"Hello World 0fa46c23-9c7f-4d25-5dfd-fcc67c7a426b","tmx":1388775322979},
    {"n":3,"msg":"Hello World 2b7f49ba-2dec-3c88-a27f-bb659fbee192","tmx":1388775322979},
    {"n":4,"msg":"Hello World 51035082-8fb6-4edf-7fe2-69df5d3ef8f4","tmx":1388775322979},
    {"n":5,"msg":"Hello World 727a6582-c392-f49f-0a41-1052de172bac","tmx":1388775322979}]


### Usage

    // require
    var split_json = require('split-json')
    
    split_json(stream, [match], callback (err, obj))
    
    match: optional split argument to specify where to split the data. 
           The default is your current operating systems EOL sequence 
           (via require('os').EOL).
    


    // CODE
    
    // readable stream from file
    
    var fs = require('fs');
    var split_json = require('split-json');
    
    var rs = fs.createReadStream('some_file.json');
    
    split_json(rs, function (err, obj) {
        if (err) throw err;
        
        console.log(obj);
    });
    
    
    




### The MIT License (MIT)

**Copyright (c) 2013 [Joaquim Serafim](http://joaquimserafim.pt)**

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.