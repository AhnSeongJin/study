var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var sanitizeHtml = require('sanitize-html');
var qs = require('querystring');
var template = require('../lib/template.js');

router.get('/login', function(request, response){
  var title = 'WEB - login';
  var list = template.list(request.list);
  var html = template.HTML(title, list, `
    <form action="/auth/login_process" method="post">
      <p><input type="text" name="email" placeholder="email"></p>
      <p><input type="password" name="pwd" placeholder="password"></p>
      <p>
        <input type="submit" value="login">
      </p>
    </form>
  `, '');
  response.send(html);
});

/*
router.post('/login_process', function(request, response){
  var post = request.body;
  var email = post.email;
  var password = post.pwd;
  if(email === authData.email && password === authData.password){ //success
    request.session.is_logined = true;
    request.session.nickname = authData.nickname;
    //save함수 없는 경우 저장전 바로 redirect 해서 로그인 안되는 경우 발생
    request.session.save(function(){ //저장 후 redirection
      response.redirect('/');
    });
  } else {
    response.send('Who?');
  }
});
 */

router.get('/logout', function(request, response){
  request.logout();
  request.session.save(function(){
    response.redirect('/');
  });
  // request.session.destroy(function(err){
  //   response.redirect('/');
  // });
});

/*
//기존에 있던 url 값에서 topic 제거, main에서 /topic 으로 요청했기 때문에

router.get('/create', function(request, response){
  var title = 'WEB - create';
  var list = template.list(request.list);
  var html = template.HTML(title, list, `
    <form action="/topic/create_process" method="post">
      <p><input type="text" name="title" placeholder="title"></p>
      <p>
        <textarea name="description" placeholder="description"></textarea>
      </p>
      <p>
        <input type="submit">
      </p>
    </form>
  `, '');
  response.send(html);
});

router.post('/create_process', function(request, response){
  var post = request.body;
  var title = post.title;
  var description = post.description;
  fs.writeFile(`data/${title}`, description, 'utf8', function(err){
    response.redirect(`/topic/${title}`);
  })
});

router.get('/update/:pageId', function(request, response){
  var filteredId = path.parse(request.params.pageId).base;
  fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
    var title = request.params.pageId;
    var list = template.list(request.list);
    var html = template.HTML(title, list,
      `
      <form action="/topic/update_process" method="post">
        <input type="hidden" name="id" value="${title}">
        <p><input type="text" name="title" placeholder="title" value="${title}"></p>
        <p>
          <textarea name="description" placeholder="description">${description}</textarea>
        </p>
        <p>
          <input type="submit">
        </p>
      </form>
      `,
      `<a href="/topic/create">create</a> <a href="/topic/update/${title}">update</a>`
    );
    response.send(html);
  });
});

router.post('/update_process', function(request, response){
  var post = request.body;
  var id = post.id;
  var title = post.title;
  var description = post.description;
  fs.rename(`data/${id}`, `data/${title}`, function(error){
    fs.writeFile(`data/${title}`, description, 'utf8', function(err){
      response.redirect(`/topic/${title}`);
    })
  });
});

router.post('/delete_process', function(request, response){
  var post = request.body;
  var id = post.id;
  var filteredId = path.parse(id).base;
  fs.unlink(`data/${filteredId}`, function(error){
    response.redirect('/');
  })
});

//상세페이지
router.get('/:pageId', function(request, response, next){
  var filteredId = path.parse(request.params.pageId).base;
  fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
    if(err){ //에러가 있는 경우 ex)/page/html 이 아닌 /page/html1 로 들어온 경우, 아예 없는 페이지의 경우 404 에러 미들웨어 실행
      next(err); //맨 아래쪽에 에러 미들웨어를 실행 (500에러)
    } else {
      var title = request.params.pageId;
      var sanitizedTitle = sanitizeHtml(title);
      var sanitizedDescription = sanitizeHtml(description, {
        allowedTags:['h1']
      });
      var list = template.list(request.list);
      var html = template.HTML(sanitizedTitle, list,
        `<h2>${sanitizedTitle}</h2>${sanitizedDescription}`,
        ` <a href="/topic/create">create</a>
          <a href="/topic/update/${sanitizedTitle}">update</a>
          <form action="/topic/delete_process" method="post">
            <input type="hidden" name="id" value="${sanitizedTitle}">
            <input type="submit" value="delete">
          </form>`
      );
      response.send(html);
    }
  });
});
*/
module.exports = router; 