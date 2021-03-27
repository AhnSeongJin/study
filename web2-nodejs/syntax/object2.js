var f = function(){
  console.log(1+1);
  console.log(1+2);
}
var a = [f];
a[0]();

var o = {
  func:f
}
o.func();

// 함수가 데이터(값)이기도 해서 배열이나 객체에 담을수 있다. 물론 변수에도