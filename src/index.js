#!/usr/bin/env node

const { handleArguments } = require('./helpers');
const { runCommand } = require('./commands');

runCommand(handleArguments());