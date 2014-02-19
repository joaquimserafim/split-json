2014.01.03, Version 1.0.0

* Release first version

2014.01.11, Version 1.1.0

* Removed JSONHandler to parse JSON
* Added JSONSream for parsing JSON
* Added binary-split for split data when still as Buffer, this show good performance improvements


2014.01.12, Version 1.2.0

* Now can use split-json through pipe or callaback, check examples in README
* Add modules "splt" and removed "binary-split"

2014.01.12, Version 1.2.1

* Removed support to version of Node.js "0.8"


2014.01.14

* Was corrected the regex pattern "/^\[/" by "/^\[\n/" when use split-json through a pipe


2014.01.14

* Removed modules "split" & "JSONStream"


2014.02.08, Version 1.4.2

* Add function 'JSONValid' which can be used to validate the object instead to use JSON.parse and try/catch, 'JSONValid' will return an valid object or null in case bad object, example in README.

* Change the callback code to a function instead to have directly in callback.


2014.02.16, Version 1.5.2

* Removed module "through" by "through-tuga" to support Stream2/Stream3
* Changed "tape" by "assert" for unit test
