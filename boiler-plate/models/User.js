const mongoose = require('mongoose');

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

const User = mongoose.model('User', userSchema);

module.exports = {User};