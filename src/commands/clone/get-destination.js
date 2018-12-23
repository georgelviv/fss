const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

const accessFs = promisify(fs.access);

const getNextFileName = (src) => {
  const suffixRegExp = /\_\d+$/g;
  const fullfilename = path.basename(src);
  const dirname = path.dirname(src);
  const extension = path.extname(src);
  let filename = fullfilename.replace(/\.[^/.]+$/, '');
  const number = suffixRegExp.test(filename)
    ? Number(filename.split('_').slice(-1)[0]) + 1
    : 1;

  const newFilename = `${ filename.replace(suffixRegExp, '') }_${ number }${ extension }`;

  return path.join(dirname, newFilename);
}

async function getDestination(src, destination) {
  const filename = path.basename(src);
  let distFolder = destination 
    ? destination
    : process.cwd();

  const isFile = path.basename(distFolder).includes('.');
  let dst = isFile 
    ? distFolder
    : path.join(distFolder, filename);

  try {
    await accessFs(dst);
    dst = getNextFileName(dst);
    dst = await getDestination(src, dst);
  } catch (e) {}

  return dst;
}

module.exports = getDestination;