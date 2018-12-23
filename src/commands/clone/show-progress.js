const through = require('through2');

const { Duplex } = require('stream');

const readline = require('readline');
const INTERVAL = 10;


function showProgress(totalSize) {
  let bytesRead = 0;
  let interval;

  interval = setInterval(() => {
    const percentage = Math.round(bytesRead / totalSize * 100);
    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0, null);
    process.stdout.write(percentage + '%')
  }, INTERVAL);

  return through(function (chunk, enc, callback) {
    this.push(chunk);
    bytesRead += chunk.length;
    callback();
  }, function (callback) {
    clearInterval(interval);

    readline.clearLine(process.stdout, 0);
    readline.cursorTo(process.stdout, 0, null);

    callback();
  });
}


module.exports = showProgress;