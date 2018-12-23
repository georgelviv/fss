const handleArguments = () => {
  const flagRegEx = /^\-|\-\-/

  const args = process.argv.slice(2);

  const commands = args.filter(item => {
    return !item.match(flagRegEx);
  });
  const flags = args.filter(item => {
    return item.match(flagRegEx);
  });

  const [action, param1, param2] = commands;
  return { action, param1, param2, flags };
}

module.exports = handleArguments;