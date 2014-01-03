module.exports = new JSONhandler();

function JSONhandler () {
  if (!(this instanceof JSONhandler)) return new JSONhandler();
}

JSONhandler.prototype.parse = function (data) {
  try {
    return JSON.parse(data);
  } catch (err) {
    return null;
  }
};

// [, replacer [, space]]
JSONhandler.prototype.stringify = function (data, replacer, space) {
  try {
    return JSON.stringify(data, replacer, space);
  } catch (err) {
    return null;
  }
};