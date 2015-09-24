var Secrets = function (db) {
  this.secrets = [];
  this.db = db;

  this.updateFromDB();
};

Secrets.prototype.updateFromDB = function () {
  this.secrets = [];
  var _this = this;
  this.db.each(function (doc, offset) {
    _this.secrets.push(doc);
  });
};

Secrets.prototype.get = function () {
  return this.secrets.sort(function (a, b) {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};

Secrets.prototype.removeLast = function () {
  var filter = function (doc, count) {
    return count >= 100;
  };

  var count = -1;
  this.db.remove(function (doc) {
    count += 1;
    return filter(doc, count);
  });
};

Secrets.prototype.add = function (secret, cb) {
  var _this = this;
  this.db.insert(secret, function (begin, count) {
    if (count > 100) {
      _this.removeLast();
    }

    _this.updateFromDB();

    cb(secret);
  });
};

module.exports = Secrets;