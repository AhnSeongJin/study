import axios from 'axios';
import { 
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER
} from './types';

export function loginUser(dataToSubmit) {
  //서버에 값 보내기 > server쪽 index.js 로 간다.
  const request = axios.post('/api/users/login', dataToSubmit)
  .then(response => response.data)

  return {
    type: LOGIN_USER,
    payload: request
  }
}

export function registerUser(dataToSubmit) {
  //서버에 값 보내기 > server쪽 index.js 로 간다.
  const request = axios.post('/api/users/register', dataToSubmit)
  .then(response => response.data)

  return {
    type: REGISTER_USER,
    payload: request
  }
}

export function auth(dataToSubmit) {
  //서버에 값 보내기 > server쪽 index.js 로 간다.
  const request = axios.get('/api/users/auth')
  .then(response => response.data)

  return {
    type: AUTH_USER,
    payload: request
  }
}