// Local(Development): 개발모드 , Deploy(Production): 운영모드
// 위 두가지에 따라 다르게

if(process.env.NODE_ENV === 'production'){
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}