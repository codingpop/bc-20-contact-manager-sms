'use strict';

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost/contactmanager';
const userCollection = 'tunde';

// This function saves contact to the database
const saveContact = function (firstName, lastName, phoneNumber) {
  MongoClient.connect(url, function (err, db) {

    let cursor = db.collection(userCollection);

    // Add data to the database
    cursor.insertOne({
      first_name: firstName,
      last_name: lastName,
      phone_number: phoneNumber
    });
    db.close();
  });
}

const findContact = function (query) {
  MongoClient.connect(url, function (err, db) {
    
    let cursor = db.collection(userCollection);
    cursor.find({ $or: [{ first_name: query }, { last_name: query }] }).toArray(function (err, doc) {
      
      if (!doc.length) {
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