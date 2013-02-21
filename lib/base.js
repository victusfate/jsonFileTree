// Generated by CoffeeScript 1.4.0
(function() {
  var fs, jsonFileTree;

  fs = require('fs');

  jsonFileTree = function(path, obj) {
    var dirTree;
    dirTree = function(filename, obj) {
      var info;
      info = {
        path: filename,
        name: path.basename(filename)
      };
      if (fs.lstatSync(filename).isDirectory()) {
        obj[info.name] = {};
        return fs.readdirSync(filename).map(function(child) {
          return dirTree(filename + '/' + child, obj[info.name]);
        });
      } else {
        if (info.name.match(/json/)) {
          return obj[info.name] = JSON.parse(fs.readFileSync(info.path));
        }
      }
    };
    obj = {};
    return dirTree(path, obj);
  };

  module.exports = {
    jsonFileTree: jsonFileTree
  };

}).call(this);