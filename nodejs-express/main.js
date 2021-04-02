const express = require('express');
const app = express();
const port = 3000;
var fs = require('fs');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet')

var indexRouter = require('./routes/index');
var topicRouter = require('./routes/topic');

app.use(helmet()) //보안
app.use(express.static('public')); //정적파일(public에서 정적파일 찾음)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression()); //압축
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