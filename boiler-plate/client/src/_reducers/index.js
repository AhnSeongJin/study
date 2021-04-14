import { combineReducers } from 'redux';
import user from './user_reducer';

// 여러가지 reducer 를 combineReducers 를 이용해서 rootReducer 에 합친다.
const rootReducer = combineReducers({
  user
})

export default rootReducer;