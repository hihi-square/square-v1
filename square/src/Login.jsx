
import React from 'react';

export default function Login() {
    return (
        <div className="page">
            <div className='titleWrap'>
                Login
            </div>

            <div className='contentWrap'>
                <div className='inputTitle'>이메일주소</div>
                <div className='inputWrap'>
                    <input 
                        className='input' 
                        placeholder='test@gmail.com'/>
                </div>
                <div className='errorMessageWrap'>
                    올바른 이메일을 입력해주세요.
                </div>


                <div style={{ marginTop: "26px" }} className='inputTitle'>비밀번호</div>
                <div className='inputWrap'>
                    <input 
                    className='input'
                    placeholder='영문, 숫자, 특수문자 포함 8자 이상 입력해주세요'/>

                </div>
                <div className='errorMessageWrap'>
                    영문, 숫자, 특수문자 포함 8자 이상 입력해주세요.
                </div>
            </div>

            <div>
                <button>
                    확인
                </button>
            </div>

        </div>
    );
}