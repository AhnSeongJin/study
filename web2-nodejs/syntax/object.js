var member = ['egoing', 'k8805', 'hoya'];
console.log(member[1]);
var i = 0;
while(i < member.length){
  console.log('array loop => ', member[i]);
  i = i + 1;
}

var roles = {
  'programmer':'egoing',
  'desiner':'k8805',
  'manager':'hoya'
}
console.log(roles.desiner);
console.log(roles['desiner']);

for(var name in roles){
  console.log('object => ', name, 'value => ', roles[name]);
}

array.forEach(roles => {
  console.log(roles)
});