const copyFile = require('./copy-file');
const getDestination = require('./get-destination');
const checkSource = require('./check-source');

async function clone({ param1, param2, flags }) {
  const source = param1;
  if (!source) {
    throw Error('Source is required param');
  }

  const isProgressFlag = flags.some(flag => {
    return /\-p|\-\-progress/.test(flag);
  });

  try {
    await checkSource(source);
    const destination = await getDestination(source, param2);
    await copyFile(source, destination, isProgressFlag);

    console.log('clonned', destination);
  } catch (e) {
    console.error('Error to clone');
  }
};

module.exports = clone;