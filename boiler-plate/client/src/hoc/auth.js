import React, { useEffect } from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux'
import { auth } from '../_actions/user_action'

export default function(SpecificComponent, option, adminRoute = null) {
  // App.js 에서 페이지 이동시 auth로 감싸서 사용

  // SpecificComponent: WrappedComponent(이동할 페이지)

  // option 3가지
  // null   => 아무나 출입이 가능한 페이지
  // true   => 로그인한 유저만 출입이 가능한 페이지
  // false  => 로그인한 유저는 출입 불가능한 페이지

  // adminRoute: 기본값 null, true 주면 admin만 접근 가능

  function AuthenticationCheck(props) {
    //Redux 사용
    const dispatch = useDispatch();

    //페이지 요청시 react가 back end 에게 상태값을 request
    useEffect(() => {

      dispatch(auth().then(response => {
        console.log(response)

        //로그인 하지 않은 상태
        if(!response.payload.isAuth) {
          if(option) {
            props.history.push('/login')
          }
        } else { //로그인 한 상태
          //admin이 아닌경우
          if(adminRoute && !response.payload.isAdmin) {
            props.history.push('/')
          } else {
            if(option === false){ //로그인한 유저는 출입 불가능한 페이지
              props.history.push('/')
            }
          }
        }

      }))

    }, [])

    return (
      <SpecificComponent />
    )
  }




  return AuthenticationCheck
}