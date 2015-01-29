module.exports = function(targetPath) {
  var requiredFiles;
  requiredFiles = {};
  require('fs').readdirSync(targetPath).forEach(function(file) {
    var name;
    if ((file.match(/.+\.js/g) != null) && file !== 'index.js') {
      name = file.replace('.js', '');
      requiredFiles[name] = require("" + targetPath + "/" + file);
    }
  });
  console.log(targetPath);
  return requiredFiles;
};