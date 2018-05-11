'use strict';

var EventEmitter = require ('events'),
    eventconfig = require('./config'),
    consoleStr = ``;
const maxElection = 19;

function getStr() {
  return consoleStr;
}
function setStr(data) {
  consoleStr += (`<br>${data}`);
}
exports.getStr = getStr;
exports.setStr = setStr;

exports.persons = class persons {
  contractor(data){
    this.data = data;
  }
  getAll() {
    for(let i=0; i<this.data.length; i++) {
      let str = `${this.data[i]}`;
      console.log(str);
      setStr(str);
    }    
  }
}

exports.person = class politician extends EventEmitter {
  constructor(name, votes=0) {
    super();
    this.name = name;
    this.votes = votes;
    let str = `contractor:: \t${ this.name }: ${this.votes}`;
    console.log(str);
    setStr(str);
  }
  getVotes() {
   // console.log(`getVotes:: \t${ this.name }: ${this.votes}`);
    return this.votes;
  }
  checkVotes() {
    let err = false;
    return new Promise((resolve, reject) => {
      if (data > maxElection) err = true;
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  }
  setVotes(data) {
    console.log(`setVotes\t ${data}`);
    if (data > maxElection) {
      let str = `data invalid!! ${data} is bigger than maximum of ${maxElection}`;
      console.log(str);
      setStr(str);
    } else {
      this.votes = data;
      this.emit(eventconfig.ELECTION, `${this.name} : ${this.votes}`);
    }

    // this.checkVotes()
    // .then((data) => {
    //   this.votes = data;
    //   this.emit(eventconfig.ELECTION, `${this.name} : ${this.votes}`);
    // })
    // .catch((err) => {
    //   this.emit(eventconfig.EXCEPTION, `${this.name} : ${this.votes}`);
    // });
  }
  addVotes(data) {
    this.setVotes(this.votes+data);
    
    let str = `addVotes:: \t${ this.name }: ${data}`;
    console.log(str);
    setStr(str);    
  }
  reset() {
    this.setVotes(0);

    let str = `reset:: \t${ this.name }: ${this.votes}`;
    console.log(str);
    setStr(str);  
  }
}