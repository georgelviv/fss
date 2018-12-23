const fs = require('fs');
const { promisify } = require('util');
const lstatFs = promisify(fs.lstat);

const showProgress = require('./show-progress');

function cp(src, dst, size) {
  return new Promise((resolve, reject) => {
    const rd = fs.createReadStream(src);
    const wr = fs.createWriteStream(dst);

    wr.on('error', function(err) {
      if (e.error === 'ENOENT') {
        console.error(`File [${ src }] not exists`);
      } else {
        console.error('Error to copy file', e);
      }
      reject(err);
    });

    wr.on('close', resolve);

    if (size) {
      const progress = showProgress(size);
      rd.pipe(progress).pipe(wr);
    } else {
      rd.pipe(wr);
    }
  });
}

function copyFile(src, dst, isProgressFlag) {
  if (isProgressFlag) {
    return lstatFs(src)
      .then((stat) => {
        return cp(src, dst, stat.size); 
      })
  } else {
    return cp(src, dst);
  }
}

module.exports = copyFile;