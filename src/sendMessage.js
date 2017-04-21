'use strict';

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost/contactmanager';
const userCollection = 'tunde';

'use strict';
const Jusibe = require('jusibe');
const jusibe = new Jusibe("ad029994918885b1726fbee07a69ca8d", "0f13a26c14e228173d817e173228ab7b");

// const payload = {
//   to: target,
//   from: 'Tunde',
//   message: "My friend, go get me Gala."
// };

const sendMessage = function (name, message) {
  MongoClient.connect(url, function (err, db) {

    let cursor = db.collection(userCollection);

    cursor.find({ first_name: name }).toArray(function (err, doc) {

      if (!doc.length) {
        console.log('Contact not found');
      }

      if (doc.length === 1) {
        const target = Number(doc[0].phone_number);

        const payload = {
          to: target,
          from: 'Tunde',
          message: message
        };

        jusibe.sendSMS(payload, function (err, res) {
          if (res.statusCode === 200) {
            console.log('Message sent');
          }
          else {
            console.log(err);
          }
        });

      }
    })
    db.close();
  });

}


// const sendMessage = function (number) {

// }

module.exports.sendMessage = sendMessage;