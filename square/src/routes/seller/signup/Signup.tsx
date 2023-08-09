import React, { useState } from "react";
import axios from "axios";
import DaumPostcodeEmbed from "react-daum-postcode";
import { Address } from "react-daum-postcode/lib/loadPostcode";

export default function SignUp() {
  const [name, setName] = useState<string>("");
  const [nameValid, setNameValid] = useState(false);

  const [id, setId] = useState<string>("");
  const [idValid, setIdValid] = useState(false);
  const [isIdDuplicated, setIsIdDuplicated] = useState(false);

  const [pw, setPw] = useState<string>("");
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const [email, setEmail] = useState<string>("");
  const [emailValid, setEmailValid] = useState(false);

  const [nickname, setNickname] = useState<string>("");
  const [nicknameValid, setNicknameValid] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [phoneNumberValid, setPhoneNumberValid] = useState(false);

  const [marketing, setMarketing] = useState<boolean>(false);
  
  const [bcode, setBcode] = useState<string>("")
  const [address, setAddress] = useState<string>("")
  const [storeName, setStoreName] = useState<string>("")
  const [storePhone, setStorePhone] = useState<string>("")
  const [storePhoneValid, setStorePhoneValid] = useState(false);

  const [content, setContent] = useState<string>("")
  const [bank, setBank] = useState<string>("")
  const [account, setAccount] = useState<string>("")
  const [latitude, setLatitude] = useState<string>("")
  const [longtitude, setLongtitude] = useState<string>("")
  const [businessInformation, setBusinessInformation] = useState<string>("") // 하위 key-value 쌍을 어떻게 정의?

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setNameValid(e.target.value.length >= 2);
  };

  const handleId = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // 이메일 유효성 검사
    const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    setEmailValid(regex.test(e.target.value));
    updateNotAllow();
  };

  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    // 닉네임 유효성 검사 (여기서는 최소 3글자 이상으로 가정)
    setNicknameValid(e.target.value.length >= 3);
    updateNotAllow();
  };

  const handlePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
    // 전화번호 유효성 검사 (여기서는 숫자 11자리로 가정)
    const regex = /^\d{11}$/;
    setPhoneNumberValid(regex.test(e.target.value));
    updateNotAllow();
  };

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value)
    updateNotAllow();
  };

  const handleStoreName  = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStoreName(e.target.value)
  };

  const handleStorePhone  = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStorePhone(e.target.value);
    // 전화번호 유효성 검사 (여기서는 숫자 10자리로 가정)
    const regex = /^\d{10}$/;
    setStorePhoneValid(regex.test(e.target.value));
    updateNotAllow();
  };

  const handleContent  = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
  };

  const handleBank  = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBank(e.target.value)
  };

  const handleAccount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBank(e.target.value)
  };

  const handleMarketing = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMarketing(e.target.checked);
    updateNotAllow();
  };

  const updateNotAllow = () => {
    setNotAllow(!idValid || !pwValid || !nameValid || !emailValid || !nicknameValid || !phoneNumberValid);
  };

  const handleSignup = () => {
    const body = {
      uid: id,
      password: pw,
      name: name,
      email: email,
      nickname: nickname,
      phoneNumber: phoneNumber,
      marketing: marketing,
      bcode: bcode,
      address: address,
      storeName: storeName,
      storePhone: storePhone,
      content: content,
      bank: bank,
      latitude: latitude,
      longtitude: longtitude,
      businessInofrmation: {
        companyRegistrationNumber: companyRegistrationNumber,
        ceoName: ceoName,
        openingDate: openingDate,
        corporateRegistration: corporateRegistration,
        businessName: businessName,
        businessFile: businessFile,
      }
    };

    axios
      .post("http://i9b208.p.ssafy.io:8811/store", body)
      .then((response) => {
        if (response.data.success) {
          console.log("성공???");
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

  const onDataHandler = (address: Address) => {
    console.log(address)
    setBcode(address.bcode)
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
          비밀번호
        </div>
        <div className="inputWrap">
          <input
            className="input"
            type="password"
            placeholder="비밀번호를 입력하세요 (영문, 숫자, 특수문자 포함 8-20자)"
            value={pw}
            onChange={handlePw}
          />
        </div>
        <div className="errorMessageWrap">
          {!pwValid && pw.length > 0 && (
            <div>
              비밀번호는 영문, 숫자, 특수문자를 포함하여 8-20자로 입력해주세요.
            </div>
          )}
        </div>

        <div style={{ marginTop: '26px' }} className="inputTitle">
          이메일
        </div>
       
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={handleEmail}
          />
        </div>
        <div className="errorMessageWrap">
          {!emailValid && email.length > 0 && (
            <div>올바른 이메일 형식이 아닙니다.</div>
          )}
        </div>

        <div style={{ marginTop: '26px' }} className="inputTitle">
          닉네임
        </div>
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="닉네임을 입력하세요 (최소 3글자)"
            value={nickname}
            onChange={handleNickname}
          />
        </div>

        <div className="errorMessageWrap">
          {!nicknameValid && nickname.length > 0 && (
            <div>닉네임은 최소 3글자 이상 입력해주세요.</div>
          )}
        </div>

        <div style={{ marginTop: '26px' }} className="inputTitle">
          전화번호
        </div>
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="전화번호를 입력하세요 (숫자 11자리)"
            value={phoneNumber}
            onChange={handlePhoneNumber}
          />
        </div>
        <div className="errorMessageWrap">
          {!phoneNumberValid && phoneNumber.length > 0 && (
            <div>올바른 전화번호 형식이 아닙니다. (숫자 11자리)</div>
          )}
        </div>

        <div style={{ marginTop: '26px' }} className="inputTitle">
          가게 이름
        </div>
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="가게 이름을 입력하세요."
            value={storeName}
            onChange={handleStoreName}
          />
        </div>
        
        <div style={{ marginTop: '26px' }} className="inputTitle">
          가게전화번호
        </div>
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="가게 전화번호를 입력하세요 (숫자 10자리)"
            value={storePhone}
            onChange={handleStorePhone}
          />
        </div>
        <div className="errorMessageWrap">
          {!storePhoneValid && storePhone.length > 0 && (
            <div>올바른 전화번호 형식이 아닙니다. (숫자 10자리)</div>
          )}
        </div>


        <div style={{ marginTop: '26px' }} className="inputTitle">
          content
        </div>
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="내용을 입력하세요."
            value={content}
            onChange={handleContent}
          />
        </div>

        <div style={{ marginTop: '26px' }} className="inputTitle">
          bank
        </div>
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="가게 이름을 입력하세요."
            value={bank}
            onChange={handleBank}
          />
        </div>

        <div style={{ marginTop: '26px' }} className="inputTitle">
          Account
        </div>
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="계좌를 입력하세요."
            value={account}
            onChange={handleAccount}
          />
        </div>

        <div style={{ marginTop: '26px' }} className="inputTitle">
        주소 입력란
        <DaumPostcodeEmbed
        onComplete={onDataHandler}
        />
        </div>
        <div className="inputWrap">
          <input
            className="input"
            type="text"
            placeholder="주소를 입력하세요"
            value={address}
            onChange={handleAddress}
          />
        </div>

        <div style={{ marginTop: '26px' }}>
          <input
            type="checkbox"
            checked={marketing}
            onChange={handleMarketing}
          />
          마케팅 동의
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
    </div>
  );
}

