var moment = require('moment');
//Jan 1st 1970 00:00:00 am

var createAt = 1234;
var date =  moment(createAt);
// date.add(1, 'year').subtract(9, 'months');
// console.log(date.format('MMM Do, YYYY'));
console.log(date.format('h:mm a'));
