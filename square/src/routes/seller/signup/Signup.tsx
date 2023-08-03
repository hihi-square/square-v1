import React, { useState } from "react";
import axios from "axios";

export default function SignUp() {
  const [name, setName] = useState<string>(""); // 타입 명시
  const [id, setId] = useState<string>(""); // 타입 명시
  const [pw, setPw] = useState<string>(""); // 타입 명시
  const [nameValid, setNameValid] = useState(false);
  const [idValid, setIdValid] = useState(false);
  const [isIdDuplicated, setIsIdDuplicated] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const [businessNumber, setBusinessNumber] = useState<string>(""); // 타입 명시
  const [representativeName, setRepresentativeName] = useState<string>(""); // 타입 명시
  const [openingDate, setOpeningDate] = useState<string>(""); // 타입 명시

  // 사업자 등록번호 유효성 검사 함수
  const isValidBusinessNumber = (value: string): boolean => {
    const regex = /^\d{10}$/;
    return regex.test(value);
  };
  
  // 대표자성명 유효성 검사 함수
  const isValidRepresentativeName = (value: string): boolean => {
    // 외국인 사업자인 경우에는 영문명으로 입력 가능하다고 가정
    // 영문명 유효성 검사를 여기에 추가할 수도 있음
    return value !== "";
  };
  
  // 개업일자 유효성 검사 함수
  const isValidOpeningDate = (value: string): boolean => {
    const regex = /^\d{8}$/;
    return regex.test(value);
  };
  


  // 회원가입 버튼 활성화 여부 업데이트 함수
  const updateNotAllow = () => {
    setNotAllow(
      !idValid ||
      !pwValid ||
      !isValidBusinessNumber(businessNumber) ||
      !isValidRepresentativeName(representativeName) ||
      !isValidOpeningDate(openingDate)
    );
  };

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => { // 이벤트 핸들러 함수의 타입 명시
    setName(e.target.value);
    setNameValid(e.target.value.length >= 2);
  };

  const handleId = (e: React.ChangeEvent<HTMLInputElement>) => { // 이벤트 핸들러 함수의 타입 명시
    setId(e.target.value);
    const regex = /^[a-z]+[a-z0-9]{5,19}$/g;
    setIdValid(regex.test(e.target.value));
    updateNotAllow();
  };

  const handleCheckId = () => {
    axios
      .get(`http://i9b208.p.ssafy.io:8811/user/id/${id}`)
      .then((response) => {
        setIsIdDuplicated(response.data.duplicated);
        updateNotAllow();
      })
      .catch((error) => {
        console.error("아이디 중복 확인 오류:", error);
      });
  };

  const handlePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    setPwValid(regex.test(e.target.value));
    updateNotAllow();
  };
  
  const handleBusinessNumber = (e: React.ChangeEvent<HTMLInputElement>) => { // 이벤트 핸들러 함수의 타입 명시
    const input = e.target.value.replace("-", "");
    setBusinessNumber(input);
    updateNotAllow();
  };

  const handleRepresentativeName = (e: React.ChangeEvent<HTMLInputElement>) => { // 이벤트 핸들러 함수의 타입 명시
    setRepresentativeName(e.target.value);
    updateNotAllow();
  };

  const handleOpeningDate = (e: React.ChangeEvent<HTMLInputElement>) => { // 이벤트 핸들러 함수의 타입 명시
    const input = e.target.value.replace("-", "");
    setOpeningDate(input);
    updateNotAllow();
  };

  
  const handleSignup = () => {
    
    const body = {
      uid: id,
      password: pw,
      businessNumber: businessNumber,
      representativeName: representativeName,
      openingDate: openingDate,
    }
  
    axios
    .post("http://43.201.255.188:8811/store/business-license", body)
    .then((response) => {
          if (response.data.success) {
            console.log("성공???")
            alert("회원가입에 성공했습니다.");
            window.location.href = "/login";
          } else {
            alert("이미 등록된 아이디입니다.");
          }
        })
        .catch((error) => {
          console.error("회원가입 오류:", error);
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
            value={name}
            onChange={handleName}
          />
        </div>
        <div className="errorMessageWrap">
          {!nameValid && name.length > 0 && (
            <div>이름을 최소 2글자 이상 입력해주세요.</div>
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
        <div className="errorMessageWrap">
          {isIdDuplicated && <div>이미 사용 중인 아이디입니다.</div>}
        </div>
        <div className="errorMessageWrap">
          {!idValid && id.length > 0 && (
            <div>올바른 아이디를 입력해주세요.</div>
          )}
        </div>

        <div style={{ marginTop: '26px' }} className="inputTitle">
          사업자 등록번호
        </div>
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="사업자 등록번호를 입력하세요 (예: 1234567890)"
            value={businessNumber}
            onChange={handleBusinessNumber}
          />
        </div>
        <div className="errorMessageWrap">
          {!isValidBusinessNumber(businessNumber) && businessNumber.length > 0 && (
            <div>올바른 사업자 등록번호 형식이 아닙니다. (예: 1234567890)</div>
          )}
        </div>

        <div style={{ marginTop: '26px' }} className="inputTitle">
          대표자 성명
        </div>
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="홍길동"
            value={representativeName}
            onChange={handleRepresentativeName}
          />
        </div>
        <div className="errorMessageWrap">
          {!isValidRepresentativeName(representativeName) && representativeName.length > 0 && (
            <div>대표자 성명을 입력해주세요.</div>
          )}
        </div>

        <div style={{ marginTop: '26px' }} className="inputTitle">
          개업일자
        </div>
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="개업일자를 입력하세요 (예: 20230101)"
            value={openingDate}
            onChange={handleOpeningDate}
          />
        </div>
        <div className="errorMessageWrap">
          {!isValidOpeningDate(openingDate) && openingDate.length > 0 && (
            <div>올바른 개업일자 형식이 아닙니다. (예: 20230101)</div>
          )}
        </div>

        {/* 이메일, 닉네임, 전화번호, 마케팅 동의 관련 코드 생략 */}

      </div>

      <div>
        <button
          onClick={handleSignup}
          disabled={notAllow}
          className="bottomButton"
        >
          가입하기
        </button>
      </div>
    </div>
  );
}

