# Contact Manager Pro

## Introduction

* __Contact Manager Pro__ is a JavaScript command line contact manager app
* It has the following features:
  * Adding contacts to the database
  * Finding contacts
  * Texting contacts

## Dependencies

* This app depends on these some NPM packages including:
  * [MongoDB](https://www.npmjs.com/package/mongodb), which connects the app to a MongoDB Database
  * [Jusibe](https://www.npmjs.com/package/jusibe), allows the app to send SMS

## Installation and Setup

* Clone the app's repository to your machine, using:
`git clone https://github.com/tundewritescode/bc-20-contact-manager-sms.git`
* Create a MongoDB database on your machine
* Create a collection
* Using a text editor, open `database.js`
* Set the `const localDB` variable to the database you created
* Set the `const userCollection` variable to the collection you created
* Using the terminal, navigate to the repo's directory,
* Enter `npm install --save` to install the dependencies
* Navigate to the src/ directory
* Enter `node index` to run the app