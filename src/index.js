'use strict';

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

const commandParser = require('./commandParser.js');
const database = require('./database.js');

const addSyntax = 'add -n <name> -p <phone number>';
const searchSyntax = 'search <name>';

const mainMenu = function () {

  rl.question('\n Contact Manager Pro' +
    '\n What would you like to do?\n' +
    '\n [1] Add contact' +
    '\n [2] Search contact' +
    '\n [3] Send SMS' +
    '\n [4] Close application\n\n> ', function (answer) {
      if (answer == 1) {
        rl.setPrompt(`\n  Add contact using this syntax: ${addSyntax}.\n  To go back, enter back\n\n> `);
        rl.prompt();

        rl.on('line', function (userPrompt) {
          if (userPrompt.toLowerCase().trim() === 'back') {
            mainMenu();
          }


          if (commandParser.commandParser(userPrompt)) {
            let name = commandParser.commandParser(userPrompt)[0].split(' ');
            let firstName = name[0], lastName = name[1];
            let phoneNumber = commandParser.commandParser(userPrompt)[1];

            // Add to the database
            database.saveContact(firstName, lastName, phoneNumber);

            // Log message here
            console.log(`\n  ${firstName} ${lastName} added \n\n> `);

            rl.setPrompt(`Add another contact or enter exit to go back  `);
            rl.prompt();
          }
        });
      }

      if (answer == 2) {
        rl.setPrompt(`\n  Search contact using this syntax: ${searchSyntax}.\n\n> `);
        rl.prompt();

        rl.on('line', function (userPrompt) {
          let query = commandParser.commandParser(userPrompt, 'search');
          let result = database.findContact(query);
        })

      }

      if (answer == 3) {
        rl.setPrompt(`\n  `)
      }

      if (answer == 4) {
        rl.close();
      }
    }
  );

}

mainMenu();