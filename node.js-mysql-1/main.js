var http = require('http');
var url = require('url');
var topic = require('./lib/topic');
var author = require('./lib/author');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/'){
      if(queryData.id === undefined){ //홈페이지
        topic.home(request, response);
      } else { //상세보기
        topic.page(request, response);
      }
    } else if(pathname === '/create'){ //글생성 폼
      topic.create(request, response);
    } else if(pathname === '/create_process'){ //글생성
      topic.create_process(request, response);
    } else if(pathname === '/update'){ //글 업데이트 폼
      topic.update(request, response);
    } else if(pathname === '/update_process'){ //글 업데이트
      topic.update_process(request, response);
    } else if(pathname === '/delete_process'){ //글 삭제
      topic.delete_process(request, response);
    } else if(pathname === '/author'){ //저자 홈페이지
      author.home(request, response);
    } else if(pathname === '/author/create_process'){ //저자 생성
      author.create_process(request, response);
    } else if(pathname === '/author/update'){ //저자 수정
      author.update(request, response);
    } else if(pathname === '/author/update_process'){ //저자 수정
      author.update_process(request, response);
    } else if(pathname === '/author/delete_process'){ //저자 수정
      author.delete_process(request, response);
    } else {
      response.writeHead(404);
      response.end('Not found');
    }
});
app.listen(3000);
