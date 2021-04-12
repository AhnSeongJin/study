const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
// salt를 이용해서 비밀번호를 먼저 암호화 한다. saltRounds는 salt의 자릿수를 얘기하는 것
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true, // trim: 빈칸을 없애준다.
    unique: 1 // unique: 똑같은 email 쓰지 못하게
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: { // role: 어떤 유저가 관리자가 될 수도, 일반 유저가 될 수도 있다.
    type: Number, // 유저의 role을 숫자로 부여하기
    default: 0 // default: 임의로 role을 지정하지 않았을 땐 default로 0을 준다.
  },
  image: String, // {} 오브젝트를 사용하지 않고 단순하게 써줄 수도 있다.
  token: {
    type: String // token: 유효성 관리
  },
  tokenExp: {
    type: Number // tokenExp: token 사용의 유효기간
  }
})

//pre()는 몽구스 메서드
//pre('save', function()) 유저모델에 유저 정보를 저장하기 전에!! 이 함수를 실행시키겠다는 뜻이다.
//next 인자는 바로 register route로 보내주는 기능이다.
userSchema.pre('save', function(next){
  var user = this; // 정보 가져오기 위해

  //password 변경시에만 실행
  if(user.isModified('password')) { 
    //비밀번호를 암호화 시킨다.
    bcrypt.genSalt(saltRounds, function(err, salt) {
      //에러가 나면 바로 register route로 넘어가서 에러 처리하기
      if(err) return next(err);

      //bcrypt.hash(plainPwd, salt, callback(err, 암호화된비밀번호))
      //hash가 암호화된 비밀번호를 뜻한다.
      bcrypt.hash(user.password, salt, function(err, hash) {
          // Store hash in your password DB.
          if(err) return next(err);
          user.password = hash; //암호화된 비밀번호를 password에 넣어준다.
          next();
      });
    });
  } else {
    next();
  }

})

// 메서드 만들기. 아무 이름이나 상관없다.
userSchema.methods.comparePassword = function(plainPassword, callback) {
  //plainPassword 123456      암호화된 비밀번호 $2b$10$.RizDe7C055vLh/PNjINTenFEia7mpNdM175//QM6lTtukc9IHL1O
  //위 두개가 같은지 확인
  //bcrypt.compare( plainPassword , /* 해쉬된 패스워드*/ );
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if(err) return callback(err); //false 일때
    callback(null, isMatch); // true 일때
  })
}

// 메서드 만들기. 아무 이름이나 상관없다.
userSchema.methods.generateToken = function(callback) {
  var user = this;

  //jsonwebtoken을 이용해서 token을 생성하기
  var token = jwt.sign(user._id.toHexString(), 'secretToken');
  // user._id + 'secretToken'
  // ->
  // 'secretToken' -> user._id

  user.token = token;
  user.save(function(err, user) {
    if(err) return callback(err);
    callback(null, user);
  })
}

const User = mongoose.model('User', userSchema);

module.exports = {User};