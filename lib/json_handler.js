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
JSONhandler.prototype.stringify = JSON.stringify;
