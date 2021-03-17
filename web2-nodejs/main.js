var http = require('http');
var fs = require('fs');
var app = http.createServer(function(request,response){
    var url = request.url;
    if(request.url == '/'){
      url = '/index.html';
    }
    if(request.url == '/favicon.ico'){
      response.writeHead(404);
      response.end();
      return;
    }
    response.writeHead(200);
    console.log(__dirname + url);
    //response.end 부분에 내용에 따라 바뀜.
    response.end(fs.readFileSync(__dirname + url));
    //response.end('nodejs :' + url);
 
});
app.listen(3000);