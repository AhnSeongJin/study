var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')
var FileStore = require('session-file-store')(session);
  
var app = express()

app.use(session({
  secret: 'asdgsdgr!@#@$!sagbsd', //secret값은 따로 설정
  resave: false,
  saveUninitialized: true, //session이 필요하기 전까지는 구동하지 않음
  store: new FileStore() //FileStore로 session값을 sessions 파일에 저장
}))
  
app.get('/', function (req, res, next) {
  console.log(req.session);
  if(req.session.num === undefined){ //
    req.session.num = 1; //처음에 값을 1로 세팅
  } else { //이후 접속할때마다 +1
    req.session.num = req.session.num + 1;
  }
  res.send(`Views : ${req.session.num}`);
})
app.listen(3000, function(){
    console.log('3000!');
});