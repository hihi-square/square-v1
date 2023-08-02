import React, { useState } from 'react';
import axios from 'axios';

export default function SignUp() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const [nameValid, setNameValid] = useState(false);
  const [idValid, setIdValid] = useState(false);
  const [isIdDuplicated, setIsIdDuplicated] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value.length >= 2) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  };

  const handleId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
    // eslint-disable-next-line no-useless-escape
    const regex = /^[a-z]+[a-z0-9]{5,19}$/g;

    if (regex.test(e.target.value)) {
      setIdValid(true);
    } else {
      setIdValid(false);
    }

    setNotAllow(!idValid || !pwValid); // 이메일 유효성 검사를 기반으로 notAllow 업데이트
  };

  const handleCheckId = () => {
    // 서버에 아이디 중복 확인 요청 보내기
    axios.post('/api/checkId', { id })
      .then((response) => {
        // 서버 응답 처리
        setIsIdDuplicated(response.data.duplicated);
      })
      .catch((error) => {
        console.error('아이디 중복 확인 오류:', error);
      });
  };

  const handlePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
    const regex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;

    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }

    setNotAllow(!idValid || !pwValid); // 비밀번호 유효성 검사를 기반으로 notAllow 업데이트
  };

  const handleSignUp = () => {
    axios
      .post('/api/signup', { id, pw }) // 여기서 '/api/signup'은 실제 서버의 회원가입 API 엔드포인트입니다.
      .then((response) => {
        // 서버 응답 처리
        if (response.data.success) {
          alert('회원가입에 성공했습니다.');
          // 회원가입 성공 후 로그인 페이지로 이동
          window.location.href = '/login';
        } else {
          alert('이미 등록된 이메일입니다.');
        }
      })
      .catch((error) => {
        // 에러 처리
        console.error('회원가입 오류:', error);
        alert('회원가입에 실패했습니다.');
      });
  };

  return (
    <div className="page">
      <div className="titleWrap">Sign up</div>
      <div className="contentWrap">
        <div className="inputTitle">이름</div>
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="홍길동"
            value={name}
            onChange={handleName}
          />
        </div>
        <div className="errorMessageWrap">
          {!nameValid && name.length > 0 && <div>이름을 최소 2글자 이상 입력해주세요.</div>}
        </div>

        <div style={{ marginTop: '26px' }} className="inputTitle">
          Id
        </div>
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="testid"
            value={id}
            onChange={handleId}
          />
          <button onClick={handleCheckId}>중복 확인</button>
        </div>
        <div className="errorMessageWrap">
          {isIdDuplicated && <div>이미 사용 중인 아이디입니다.</div>}
        </div>
        <div className="errorMessageWrap">
          {!idValid && id.length > 0 && <div>올바른 아이디를 입력해주세요.</div>}
        </div>

        <div style={{ marginTop: '26px' }} className="inputTitle">
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
          {!pwValid && pw.length > 0 && <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>}
        </div>
      </div>

      <div>
        <button onClick={handleSignUp} disabled={notAllow} className="bottomButton">
          가입하기
        </button>
      </div>
    </div>
  );
}
