var args = process.argv; //첫줄 런타임, 두번째줄 파일경로
console.log(args[2]); //사용자 첫번째 입력 값
console.log('A');
console.log('B');
if(args[2] === '1'){
  console.log('C1');
} else {
  console.log('C2');
}
console.log('D');