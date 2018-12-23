const command =  require('./command'); 

const runCommand = ({ action, ...args }) => {
  if (!action) {
    throw Error('fss expect to receive command')
  }

  const commandAction = command[action];
  if (!commandAction) {
    throw Error(`Command [${ action }] not recognized`);
  }

  commandAction(args);
}

module.exports = runCommand;