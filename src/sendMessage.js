'use strict';

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost/contactmanager';
const userCollection = 'tunde';

'use strict';
const Jusibe = require('jusibe');
const jusibe = new Jusibe("ad029994918885b1726fbee07a69ca8d", "0f13a26c14e228173d817e173228ab7b");

let target = 08131326411;
const payload = {
  to: target,
  from: 'Tunde',
  message: "My friend, go get me Gala."
};

const sendMessage = function (name, message) {
  let phoneNumber = 0;
  MongoClient.connect(url, function (err, db) {

    let cursor = db.collection(userCollection);

    cursor.find({ $or: [{ last_name: name }] }).toArray(function (err, doc) {

      if (!doc.length) {
        console.log('Contact not found');
        console.log(cursor);
      }

      if (doc.length === 1) {
        phoneNumber = doc[0].phone_number;

        jusibe.sendSMS(payload, function (err, res) {
          if (res.statusCode === 200) {
            console.log(res.body);
          }
          else {
            console.log(err);
          }
        });

      }

      // if (doc.length > 1) {
      //   console.log(`Which ${query}?`);
      //   for (let i = 0; i < doc.length; i++) {
      //     console.log(`[${i + 1}] ${doc[i].first_name}`);
      //   }
      // }
    })
    db.close();
  });

}


// const sendMessage = function (number) {

// }

module.exports.sendMessage = sendMessage;