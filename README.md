# split-json

<a href="https://nodei.co/npm/split-json/"><img src="https://nodei.co/npm/split-json.png"></a>


split JSON was sent through some kind of readable stream into JSON objects


### Usage

    // require
    var split_json = require('split-json')
    
    split_json(stream, [encoding], callback (err, obj))
    
    encoding: ascii (default), utf8
    


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