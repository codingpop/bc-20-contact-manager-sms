'use strict';

// This function checks the syntax of the user command
const commandParser = function (command, action = 'add') {
  const addSyntax = 'add -n <name> -p <phone number>';
  const searchSyntax = 'search <name>';
  let result = [];

  command = command.trim().split(' ');
  
  if (action === 'add') { // Parsing a add contact command
    if (command.indexOf('-n') === -1 ||
        command.indexOf('-p') === -1 ||
        command.length < 5) {
      // result = `Syntax Error! Please add contact using this format: ${addSyntax}`;
      result = false;
    }

    else {
      result.push(
        command.splice(command.indexOf('-n') + 1, command.indexOf('-p') - 2).join(' '),
        command[command.indexOf('-p') + 1]
      );
    }
  }

  else if (action === 'search') {
    if (command.indexOf('search') === -1 || command.length < 2) {
      // result = `Syntax Error! Please search contact using this format: ${searchSyntax}`;
      result = false;
    }
    result = command[1];
  }

  return result;

}

module.exports.commandParser = commandParser;