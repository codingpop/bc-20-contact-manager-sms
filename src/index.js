'use strict';

const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

const commandParser = require('./commandParser.js');
const database = require('./database.js');
const sendMessage = require('./sendMessage.js');

const addSyntax = 'add -n <name> -p <phone number>';
const searchSyntax = 'search <name>';

const mainMenu = function () {

  // asks the user what action to take
  rl.question('\n Contact Manager Pro' +
    '\n What would you like to do?\n' +
    '\n [1] Add contact' +
    '\n [2] Search contact' +
    '\n [3] Send SMS' +
    '\n [4] Close application\n\n> ', function (answer) {

      if (answer == 1) { // User wants to add contact
        rl.setPrompt(`\n  Add contact using this syntax: ${addSyntax}.\n  To go back, enter -b\n\n> `);
        rl.prompt();

        // Takes the user back to the main menu
        rl.on('line', function (userPrompt) {
          if (userPrompt.toLowerCase().trim() === '-b') {
            mainMenu();
          }

          // Expects a two-element array from commandParser()
          // Grabs first and last names, and phone number
          if (commandParser.commandParser(userPrompt)) {
            let name = commandParser.commandParser(userPrompt)[0].split(' '); // Splits the full name
            let firstName = name[0], lastName = name[1];
            let phoneNumber = commandParser.commandParser(userPrompt)[1];

            // Saves name and number to the database
            database.saveContact(firstName, lastName, phoneNumber);

            rl.setPrompt(`\n  Add contact using this syntax: ${addSyntax}.\n  To go back, enter -b\n\n> `);
            rl.prompt();
          }
        });
      }

      if (answer == 2) { // User wants to search
        rl.setPrompt(`\n  Search contact using this syntax: ${searchSyntax}` +
        '\n  To go back, enter -b\n\n> ');
        rl.prompt();

        rl.on('line', function (userPrompt) {
          let query = commandParser.commandParser(userPrompt, 'search');
          database.findContact(query);
        })


      }

      if (answer == 3) { // User wants to send a message
        rl.setPrompt('\n  Send a text message using this syntax: text <name> -m "your message"' + 
        '\n  To go back, enter -b \n  > ');

        rl.prompt();

        rl.on('line', function (userPrompt) {
          let nameMessage = commandParser.commandParser(userPrompt, 'sms');

          if (!nameMessage) {
            console.log('Invalid syntax');
          }
          else {
            let name = nameMessage[0];
            let message = nameMessage[1];
            sendMessage.sendMessage(name, message);

            rl.setPrompt('');
            rl.prompt();

            rl.on('line', function (userPrompt) {
              if (userPrompt.toLowerCase().trim() === '-b') {
                mainMenu();
              }
            })
          }

        });

      }

      if (answer == 4) { // User wants to exit
        rl.close();
      }
    }
  );

}

mainMenu();