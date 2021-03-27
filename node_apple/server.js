const express = require('express');
const app = express();

app.listen(8090, function(){
  console.log('listening on 8090')
}); //서버열기

app.get('/pet', function(req, res){
  res.send('pet 사이트');
});

//html 파일 보내기
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/write.html', function(req, res){
  res.sendFile(__dirname + '/write.html');
});