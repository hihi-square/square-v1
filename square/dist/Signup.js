"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const axios_1 = __importDefault(require("axios"));
function SignUp() {
    const [name, setName] = (0, react_1.useState)('');
    const [id, setId] = (0, react_1.useState)('');
    const [pw, setPw] = (0, react_1.useState)('');
    const [nameValid, setNameValid] = (0, react_1.useState)(false);
    const [idValid, setIdValid] = (0, react_1.useState)(false);
    const [isIdDuplicated, setIsIdDuplicated] = (0, react_1.useState)(false);
    const [pwValid, setPwValid] = (0, react_1.useState)(false);
    const [notAllow, setNotAllow] = (0, react_1.useState)(true);
    const handleName = (e) => {
        setName(e.target.value);
        if (e.target.value.length >= 2) {
            setNameValid(true);
        }
        else {
            setNameValid(false);
        }
    };
    const handleId = (e) => {
        setId(e.target.value);
        // eslint-disable-next-line no-useless-escape
        const regex = /^[a-z]+[a-z0-9]{5,19}$/g;
        if (regex.test(e.target.value)) {
            setIdValid(true);
        }
        else {
            setIdValid(false);
        }
        setNotAllow(!idValid || !pwValid); // 이메일 유효성 검사를 기반으로 notAllow 업데이트
    };
    const handleCheckId = () => {
        // 서버에 아이디 중복 확인 요청 보내기
        axios_1.default.post('/api/checkId', { id })
            .then((response) => {
            // 서버 응답 처리
            setIsIdDuplicated(response.data.duplicated);
        })
            .catch((error) => {
            console.error('아이디 중복 확인 오류:', error);
        });
    };
    const handlePw = (e) => {
        setPw(e.target.value);
        const regex = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
        if (regex.test(e.target.value)) {
            setPwValid(true);
        }
        else {
            setPwValid(false);
        }
        setNotAllow(!idValid || !pwValid); // 비밀번호 유효성 검사를 기반으로 notAllow 업데이트
    };
    const handleSignUp = () => {
        axios_1.default
            .post('/api/signup', { id, pw }) // 여기서 '/api/signup'은 실제 서버의 회원가입 API 엔드포인트입니다.
            .then((response) => {
            // 서버 응답 처리
            if (response.data.success) {
                alert('회원가입에 성공했습니다.');
                // 회원가입 성공 후 로그인 페이지로 이동
                window.location.href = '/login';
            }
            else {
                alert('이미 등록된 이메일입니다.');
            }
        })
            .catch((error) => {
            // 에러 처리
            console.error('회원가입 오류:', error);
            alert('회원가입에 실패했습니다.');
        });
    };
    return (react_1.default.createElement("div", { className: "page" },
        react_1.default.createElement("div", { className: "titleWrap" }, "Sign up"),
        react_1.default.createElement("div", { className: "contentWrap" },
            react_1.default.createElement("div", { className: "inputTitle" }, "\uC774\uB984"),
            react_1.default.createElement("div", { className: "inputWrap" },
                react_1.default.createElement("input", { className: "input", type: "text", placeholder: "\uD64D\uAE38\uB3D9", value: name, onChange: handleName })),
            react_1.default.createElement("div", { className: "errorMessageWrap" }, !nameValid && name.length > 0 && react_1.default.createElement("div", null, "\uC774\uB984\uC744 \uCD5C\uC18C 2\uAE00\uC790 \uC774\uC0C1 \uC785\uB825\uD574\uC8FC\uC138\uC694.")),
            react_1.default.createElement("div", { style: { marginTop: '26px' }, className: "inputTitle" }, "Id"),
            react_1.default.createElement("div", { className: "inputWrap" },
                react_1.default.createElement("input", { className: "input", type: "text", placeholder: "testid", value: id, onChange: handleId }),
                react_1.default.createElement("button", { onClick: handleCheckId }, "\uC911\uBCF5 \uD655\uC778")),
            react_1.default.createElement("div", { className: "errorMessageWrap" }, isIdDuplicated && react_1.default.createElement("div", null, "\uC774\uBBF8 \uC0AC\uC6A9 \uC911\uC778 \uC544\uC774\uB514\uC785\uB2C8\uB2E4.")),
            react_1.default.createElement("div", { className: "errorMessageWrap" }, !idValid && id.length > 0 && react_1.default.createElement("div", null, "\uC62C\uBC14\uB978 \uC544\uC774\uB514\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694.")),
            react_1.default.createElement("div", { style: { marginTop: '26px' }, className: "inputTitle" }, "\uBE44\uBC00\uBC88\uD638"),
            react_1.default.createElement("div", { className: "inputWrap" },
                react_1.default.createElement("input", { className: "input", type: "password", placeholder: "\uC601\uBB38, \uC22B\uC790, \uD2B9\uC218\uBB38\uC790 \uD3EC\uD568 8\uC790 \uC774\uC0C1", value: pw, onChange: handlePw })),
            react_1.default.createElement("div", { className: "errorMessageWrap" }, !pwValid && pw.length > 0 && react_1.default.createElement("div", null, "\uC601\uBB38, \uC22B\uC790, \uD2B9\uC218\uBB38\uC790 \uD3EC\uD568 8\uC790 \uC774\uC0C1 \uC785\uB825\uD574\uC8FC\uC138\uC694."))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("button", { onClick: handleSignUp, disabled: notAllow, className: "bottomButton" }, "\uAC00\uC785\uD558\uAE30"))));
}
exports.default = SignUp;
