// const nodemailer = require('nodemailer');
// const email = {
//   "host": "",
//   "port": "",
//   "secure": false,
//   "auth": {
//     "user": "",
//     "pass": ""
//   }
// }

// const send = async (oprtion) =>{
//   nodemailer.createTransport(transport[ defaults])
// };

const moment = require('moment');

console.log("today", moment().format("YYYY-MM-DD"));
console.log("today+1", moment().add(1, "day").format("YYYY-MM-DD"));
console.log("week", moment().add(1, "week").format("YYYY-MM-DD"));
console.log("month", moment().add(1, "month").format("YYYY-MM-DD"));
