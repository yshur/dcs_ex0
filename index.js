'use strict';

var express = require('express'),
    app = express(),
    port = process.env.PORT || 8080,
    events = require ('events'),
    eventconfig = require('./config'),
    politician = require('./politician');

var person1 = new politician.person("Avi Gabay");
var person2 = new politician.person("Tamar Zandberg");
var person3 = new politician.person("Aiman Uda");
var politicians = [person1,person2,person3];
// var persons = new politician.persons(politicians);

for(let i=0; i<politicians.length; i++) {
  politicians[i].on(eventconfig.ELECTION, function(data) {
      let str = `change happened!!\t ${data}`;
      console.log(str);
      politician.setStr(str);
    });  
  politicians[i].addVotes(8); 
  politicians[i].addVotes(8); 
  politicians[i].addVotes(8); 
}

// persons.getAll();

for(let i=0; i<politicians.length; i++) {
  politicians[i].reset();
  politicians[i].addVotes(8); 
}

app.get('/', (req, res) => {
    let str = politician.getStr();
    res.send(`<!doctype html><html>
                <head>
                    <title>DCS - EX0</title>
                </head>
                <body>
                    <h1>Hello World!!!</h1>
                    ${str}
                </body></html>`);
});

app.listen(port);
console.log(`listening on port ${port}`);