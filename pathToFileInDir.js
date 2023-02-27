const path = require('path');

const pathToFileInDir = (relativeDirPath) => {
  return (file) => path.resolve(__dirname, relativeDirPath, file);
};

module.exports = pathToFileInDir;
