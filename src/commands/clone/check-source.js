const fs = require('fs');
const { promisify } = require('util');

const accessFs = promisify(fs.access);

async function checkSource(src) {
  try {
    await accessFs(src);
  } catch (e) {
    console.error(`File [${ src }] not exists`);
  }
}

module.exports = checkSource;