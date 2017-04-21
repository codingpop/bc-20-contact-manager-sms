'use strict';

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost/contactmanager';
const userCollection = 'tunde';

// This function saves contact to the database
const saveContact = function (firstName, lastName, phoneNumber) {
  MongoClient.connect(url, function (err, db) {

    if (err) {
      console.log('Cannot connect to the database');
    }
    else {

      let cursor = db.collection(userCollection);

      // Add data to the database
      cursor.insertOne({
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber
      });

      console.log(`\n ${firstName} ${lastName} added`);

      db.close();

    }

  });
}


const findContact = function (query) {
  MongoClient.connect(url, function (err, db) {

    let cursor = db.collection(userCollection);
    cursor.find({ first_name: query }).toArray(function (err, doc) {

      if (doc.length === 0) {
        console.log('Contact not found');
      }

      if (doc.length === 1) {
        console.log(doc[0].phone_number);
      }

      if (doc.length > 1) {
        console.log(`Which ${query}?`);
        for (let i = 0; i < doc.length; i++) {
          console.log(`[${i + 1}] ${doc[i].first_name}`);
        }
      }
    });
    db.close();
  });
}

module.exports.saveContact = saveContact;
module.exports.findContact = findContact;