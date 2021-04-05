var http = require('http');
var cookie = require('cookie');
http.createServer(function(request, response){
  console.log(request.headers.cookie);
  var cookies = {};
  //쿠키값을 지우면 parse는 에러발생
  if(request.headers.cookie !== undefined){
    cookies = cookie.parse(request.headers.cookie);
  }
  console.log(cookies.yummy_cookie);
  response.writeHead(200, {
    'Set-Cookie':[
      'yummy_cookie=choco',
      'tasty_cooki=strawberry',
      // Expires : 만료기간, Max-Age : 사용기간
      `Permanent=cookies; Max-Age=${60*60*24*30}`, //30일
      'Secure=Secure; Secure',
      'HttpOnly=HttpOnly; HttpOnly',
      'path=path; path=/cookie',
      'Doamin=Domain; Domain=o2.org' //test.o2.org으로 접속해도 살아있음
    ]
  });
  response.end('Cookie!!');
}).listen(3000);