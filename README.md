# split-json

<a href="https://nodei.co/npm/split-json/"><img src="https://nodei.co/npm/split-json.png?downloads=true"></a>

[![Build Status](https://travis-ci.org/joaquimserafim/split-json.png?branch=master)](https://travis-ci.org/joaquimserafim/split-json)


split JSON was sent through some kind of readable stream in JSON objects


## API

```js

stream.pipe(split([match], [encoding], [replace]))
.on('data', function (data) {
    console.log(split.JSONValid(data))
})

// js objects
stream.pipe(split.obj())
.on('data', function (obj) {
    console.log(obj)
})

```

*   **[match]**    => RegExp, default to os.EOL
*   **[encoding]** => String, utf8/ascii, default to utf8
*   **[replace]**  => RegExp, enable you to remove some delimiters at begin and end of a big JSON file (*ex: /(^\[\n)|(\n\]\n$)/*)

#### emitters
***on('data', callback(data))***
***on('end', [callback])***

___

##### split#JSONValid
validates JSON, instead to use JSON.parse inside of a try/catch

*split.JSONValid(obj)* -> return object `{value, error}` 

*   *value:** should be the **object** corresponding to the given JSON text or **undefined** in case of error
*   **error:** should be an **Error** object in case of error or **undefined** in case of success


##### split#isObject

check is a valid Object
*split.isObject(obj)* -> return boolean



## Examples

```js

var split = require('split-json')

// from file

var rs = fs.createReadStream('./test/file1.json')

rs.pipe(split([match])).on('data', callback)
        

// for mongoDB with mongojs use split#obj

var mongojs = require('mongojs')

var db = mongojs('str_conn')
var collection = db.collection('my_coll')

collection.find({})
.pipe(split.obj())
.on('data', function (doc) {
    console.log(doc)
})
.on('end', function () {
    db.close()
})
      
  
  
// TCP socket

on('data', function (data) {
    var rs = new Readable()
    rs.push(data)
    rs.push(null)

    rs.pipe(split(/\n/)).on('data', function cb (data) {
      cb(null, data);
    })
})

```


## Development

##### this projet has been set up with a precommit that forces you to follow a code style, no jshint issues and 100% of code coverage before commit



to run test
``` js
npm test
```

to run jshint
``` js
npm run jshint
```

to run code style
``` js
npm run code-style
```

to run check code coverage
``` js
npm run check-coverage
```

to open the code coverage report
``` js
npm run open-coverage
```

