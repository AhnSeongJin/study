const express = require('express');
const app = express();
const port = 3000;
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet')
var session = require('express-session')
var FileStore = require('session-file-store')(session)
var flash = require('connect-flash');

app.use(helmet()) //보안
app.use(express.static('public')); //정적파일(public에서 정적파일 찾음)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression()); //압축
app.use(session({
  secret: 'asdgsdgr!@#@$!sagb', //secret값은 따로 설정
  resave: false,
  saveUninitialized: true, //session이 필요하기 전까지는 구동하지 않음
  store: new FileStore() //FileStore로 session값을 sessions 파일에 저장
}))
app.use(flash()); //session을 사용하기 때문에 session 밑에 설치

var authData = {
  email:'egoing777@gmail.com',
  password:'111111',
  nickname:'egoing'
}

// 무조건 session 밑에 위치!
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

// passport 사용하기
// Passport.js는 내부적으로 express-session을 이용합니다. 두개의 미들웨어를 연결하는 방법.
app.use(passport.initialize());
app.use(passport.session());

// =============<serialize>=============
// serialize : session-store에 저장

//로그인 성공시 딱 한번 호출되어 사용자의 식별값을 session에 저장
passport.serializeUser(function(user, done) {
  console.log('serializeUser', user);
  done(null, user.email);
  // done(null, user.id);
});

//저장된 데이터를 기준으로 필요한 정보를 조회할때 사용
passport.deserializeUser(function(id, done) { //각 페이지 방문할때마다 데이터 조회
  console.log('deserializeUser', id);
  done(null, authData);
  // User.findById(id, function(err, user) {
  //   done(err, user);
  // });
});
// =============</serialize>=============

// 자격확인 (로그인 성공여부 확인)
passport.use(new LocalStrategy(
  { // form 필드명을 원하는데로, 다른 방법은 form을 페이지 예시대로 맞추기
    usernameField: 'email',
    passwordField: 'pwd'
  },
  function(username, password, done) {
    console.log('LocalStrategy', username, password);
    if(username === authData.email){ //유저이름 일치
      console.log('유저이름 일치');
      if(password === authData.password){ //로그인 성공
        console.log('로그인 성공');
        return done(null, authData);
      } else { //비밀번호 불일치
        console.log('비밀번호 불일치');
        return done(null, false, { message: 'Incorrect password.' });
      }
    } else { //유저이름 불일치
      console.log('유저이름 불일치');
      return done(null, false, { message: 'Incorrect username.' });
    }
    // 페이지 예시 코드
    /* User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); } //에러
      if (!user) { // 유저이름 불일치
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) { //비밀번호 불일치
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user); //로그인 성공
    }); */
  }
));

// ==========<인증 구현>==========
/*
app.post('/auth/login_process', //path
  passport.authenticate('local', {
    successRedirect: '/', //로그인 성공
    failureRedirect: '/auth/login' //로그인 실패
  }));
*/
// deserializeUser 안먹혀서 코드 변경
app.post('/auth/login_process', //path
  passport.authenticate('local', {failureRedirect: '/auth/login', failureFlash:true}),
  function(request, response){
    request.session.save(function(){ //저장 후 redirection
      response.redirect('/');
    });
  }
);

//Custom Callback 함수
//콜백부터 다시하기

// ==========</인증 구현>==========

var indexRouter = require('./routes/index');
var topicRouter = require('./routes/topic');
var authRouter = require('./routes/auth');

//미들웨어 등록하기
//모든 get방식 요청에서만 사용, 전체에서 사용되는 것이 아닌 get방식에서만 사용되기 때문
//app.use() 는 전체 에서 사용할때
app.get('*', function(request, response, next){
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next(); //다음 미들웨어 함수 실행
    //현재의 미들웨어 함수가 요청-응답 주기를 종료하지 않는 경우에는 next()를 호출하여 그 다음 미들웨어 함수에 제어를 전달해야 합니다. 그렇지 않으면 해당 요청은 정지된 채로 방치됩니다.
  });
});

//route, routing
app.use('/', indexRouter);
// /topic 으로 시작하는 주소들에게 topicRouter 이름의 미들웨어를 적용
app.use('/topic', topicRouter);
app.use('/auth', authRouter);







app.use(function (req, res, next) { //404에러
  res.status(404).send("Sorry can't find that!")
})

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, function(){
  console.log(`Example app listening at http://localhost:${port}`)
});