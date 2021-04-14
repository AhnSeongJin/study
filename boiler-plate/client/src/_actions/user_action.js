import axios from 'axios';
import { 
  LOGIN_USER 
} from './types';

export function loginUser(dataToSubmit) {
  //서버에 값 보내기 > server쪽 index.js 로 간다.
  const request = axios.post('/api/users/login', dataToSubmit)
  .then(response => response.data )

  return {
    type: LOGIN_USER,
    payload: request
  }
}