import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { REST_API } from "redux/store";

export default function CustomerSignUp() {
  const [username, setName] = useState("");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [checkPw, setCheckPw] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [marketing, setMarketing] = useState(false);

  const [nameValid, setNameValid] = useState(false);
  const [nicknameValid, setNicknameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);

  const [idValid, setIdValid] = useState(false);
  const [isIdDuplicated, setIsIdDuplicated] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [checkPwValid, setCheckPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const [message, setMessage] = useState("");

  // const history = useHistory ();

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    if (e.target.value.length >= 2) {
      setNameValid(true);
    } else {
      setNameValid(false);
    }
  };

  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    if (e.target.value.length >= 2) {
      setNicknameValid(true);
    } else {
      setNicknameValid(false);
    }
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value.length >= 10) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
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
    console.log("아이디는", id);
    axios
      .get(`${REST_API}user/id/${id}`)
      .then((response) => {
        // 서버 응답 처리
        if (response.data.message === "VALID") {
          console.log(response.data);
          setIsIdDuplicated(false);
          setMessage("사용 가능한 아이디 입니다.");
        } else {
          setIsIdDuplicated(true);
          // setMessage("사용 불가능한 아이디 입니다.");
        }
        console.log("성공햇당");
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("아이디 중복 확인 오류:", error);
      });
  };

  const handlePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;

    if (regex.test(e.target.value)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }

    setNotAllow(!idValid || !pwValid); // 비밀번호 유효성 검사를 기반으로 notAllow 업데이트
  };

  const handleCheckPw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPw(e.target.value);

    if (pw === e.target.value) {
      setCheckPwValid(true);
    } else {
      setCheckPwValid(false);
    }

    setNotAllow(!idValid || !checkPwValid); // 비밀번호 유효성 검사를 기반으로 notAllow 업데이트
  };

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
    if (e.target.value.length === 11) {
      setPhoneValid(true);
    } else {
      setPhoneValid(false);
    }
  };

  const updateNotAllow = () => {
    setNotAllow(
      !idValid ||
        !pwValid ||
        !nameValid ||
        !emailValid ||
        !nicknameValid ||
        !phoneValid
    );
  };

  const handleMarketing = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMarketing(e.target.checked);
    updateNotAllow();
  };

  const navigate = useNavigate();

  const handleSignUp = () => {
    const body = {
      uid: id,
      password: pw,
      nickname,
      name: username,
      phone,
      email,
      marketingAgree: marketing,
    };

    axios
      .post(`${REST_API}user`, body)
      .then((response) => {
        console.log(response.status);
        // 서버 응답 처리
        if (response.status === 201) {
          // eslint-disable-next-line no-alert
          alert("회원가입에 성공했습니다.");
          // 회원가입 성공 후 로그인 페이지로 이동
          navigate("/customer/login");
          // history.push("/customer/login"); // CustomerLogin 페이지로 이동
        } else {
          // eslint-disable-next-line no-alert
          alert("이미 등록된 아이디입니다.");
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error("회원가입 오류:", error);
        // eslint-disable-next-line no-alert
        alert("회원가입에 실패했습니다.");
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
            value={username}
            onChange={handleName}
          />
        </div>
        <div className="errorMessageWrap">
          {!nameValid && username.length > 0 && (
            <div>이름을 최소 2글자 이상 입력해주세요.</div>
          )}
        </div>

        <div className="inputTitle">닉네임</div>
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="홍홍홍"
            value={nickname}
            onChange={handleNickname}
          />
        </div>
        <div className="errorMessageWrap">
          {!nicknameValid && nickname.length > 0 && (
            <div>닉네임을 최소 2글자 이상 입력해주세요.</div>
          )}
        </div>

        <div className="inputTitle">이메일</div>
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="test@naver.com"
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className="errorMessageWrap">
          {!emailValid && email.length > 0 && (
            <div>이메일을 제대로 입력해주세요.</div>
          )}
        </div>

        <div style={{ marginTop: "26px" }} className="inputTitle">
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
        <p>{message}</p>
        <div className="errorMessageWrap">
          {isIdDuplicated && <div>이미 사용 중인 아이디입니다.</div>}
        </div>
        <div className="errorMessageWrap">
          {!idValid && id.length > 0 && (
            <div>올바른 아이디를 입력해주세요.</div>
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

        <div style={{ marginTop: "26px" }} className="inputTitle">
          비밀번호 확인
        </div>
        <div className="inputWrap">
          <input
            className="input"
            type="password"
            placeholder="설정한 비밀번호를 정확하게 입력해주세요"
            value={checkPw}
            onChange={handleCheckPw}
          />
        </div>
        <div className="errorMessageWrap">
          {!checkPwValid && checkPw.length > 0 && (
            <div>비밀번호가 일치하지 않습니다.</div>
          )}
        </div>
      </div>

      <div style={{ marginTop: "26px" }} className="inputTitle">
        핸드폰번호
      </div>
      <div className="inputWrap">
        <input
          className="input"
          type="number"
          placeholder="01012345678"
          value={phone}
          onChange={handlePhone}
        />
      </div>
      <div className="errorMessageWrap">
        {!pwValid && pw.length > 0 && (
          <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.</div>
        )}
      </div>

      <div style={{ marginTop: "26px" }}>
        <input type="checkbox" checked={marketing} onChange={handleMarketing} />
        마케팅 동의
      </div>

      <div>
        <button
          onClick={handleSignUp}
          disabled={notAllow}
          className="bottomButton"
        >
          가입하기
        </button>
      </div>
    </div>
  );
}
