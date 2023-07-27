import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// const User = {
//   email: 'test@example.com',
//   pw: 'test2323@@@'
// }

export default function Login() {
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');

    const [emailValid, setEmailValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    useEffect(() => {
      if(emailValid && pwValid) {
        setNotAllow(false);
        return;
      }
      setNotAllow(true);
    }, [emailValid, pwValid]);

    const handleEmail = (e) => {
      setEmail(e.target.value);
      const regex = 
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
      
      if (regex.test(e.target.value)) {
        setEmailValid(true);
      } else {
        setEmailValid(false);
      }
    };
    const handlePw = (e) => {
      setPw(e.target.value);
      const regex = 

      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
      
      if (regex.test(e.target.value)) {
        setPwValid(true);
      } else {
        setPwValid(false);
      }
    };

// 여기서부터 라우터 적용을 위한 코드

  const navigate = useNavigate(); 

  const onClickConfirmButton = () => {
    axios
      .post('/api/login', { email, pw }) // 여기서 '/api/login'은 실제 서버의 로그인 API 엔드포인트입니다.
      .then((response) => {
        // 서버 응답 처리
        if (response.data.success) {
          alert('로그인에 성공했습니다.');

          // 리프레시 토큰과 엑세스 토큰을 로컬 스토리지에 저장 0726
          // localStorage.setItem('refreshToken', response.data.refreshToken);
          // localStorage.setItem('accessToken', response.data.accessToken);

          navigate('/dashboard'); // 로그인 성공 시 대시보드 페이지로 이동
        } else {
          alert('등록되지 않은 회원입니다.');
        }
      })
      .catch((error) => {
        // 에러 처리
        console.error('로그인 오류:', error);
        alert('로그인에 실패했습니다.');
      });
  };
// 여기까지 라우터 적용을 위한 코드
  
    return (
      <div className="page">
        <div className="titleWrap">
          Login
        </div>

        <div className="contentWrap">
          <div className="inputTitle">이메일 주소</div>
          <div
            className="inputWrap"
          >
            <input
              className="input"
              type="text"
              placeholder="test@gmail.com"
              value={email}
              onChange={handleEmail}
            />
          </div>
          <div className="errorMessageWrap">
            {!emailValid && email.length > 0 && (
              <div>올바른 이메일을 입력해주세요.</div>
            )}
          </div>

          <div style={{ marginTop: "26px" }} className="inputTitle">
            비밀번호
          </div>
          <div className="inputWrap">
            <input
              className="input"
              type="password"
              placeholder="영문, 숫자, 특수문자 포함 8자 이상"
              value={pw}
              onChange={handlePw}
            />
          </div>
          <div className="errorMessageWrap">
            {!pwValid && pw.length > 0 && (
              <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
            )}
          </div>
        </div>

        <div>
          <button onClick={onClickConfirmButton} disabled={notAllow} className="bottomButton">
            확인
          </button>
        </div>
      </div>
    );
}




