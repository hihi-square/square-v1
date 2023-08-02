"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("@emotion/react/jsx-runtime");
/** @jsxImportSource @emotion/react */
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const react_router_dom_1 = require("react-router-dom");
function Login() {
    const [id, setId] = (0, react_1.useState)('');
    const [pw, setPw] = (0, react_1.useState)('');
    const [idValid, setIdValid] = (0, react_1.useState)(false);
    const [pwValid, setPwValid] = (0, react_1.useState)(false);
    const [notAllow, setNotAllow] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        if (idValid && pwValid) {
            setNotAllow(false);
        }
        else {
            setNotAllow(true);
        }
    }, [idValid, pwValid]);
    const handleId = (e) => {
        setId(e.target.value);
        const regex = // eslint-disable-next-line no-useless-escape
         /^[a-z]+[a-z0-9]{5,19}$/g;
        if (regex.test(e.target.value)) {
            setIdValid(true);
        }
        else {
            setIdValid(false);
        }
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
    };
    const navigate = (0, react_router_dom_1.useNavigate)();
    const onClickConfirmButton = () => {
        axios_1.default
            .post('http://43.201.255.188:8811/user/login', { id, pw })
            .then((response) => {
            if (response.data.success) {
                alert('로그인에 성공했습니다.');
                navigate('/dashboard');
            }
            else {
                alert('등록되지 않은 회원입니다.');
            }
        })
            .catch((error) => {
            console.error('로그인 오류:', error);
            alert('로그인에 실패했습니다.');
        });
    };
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "page" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "titleWrap" }, { children: "Login" })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "contentWrap" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "inputTitle" }, { children: "Id" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "inputWrap" }, { children: (0, jsx_runtime_1.jsx)("input", { className: "input", type: "text", placeholder: "testid", value: id, onChange: handleId }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "errorMessageWrap" }, { children: !idValid && id.length > 0 && ((0, jsx_runtime_1.jsx)("div", { children: "\uC62C\uBC14\uB978 \uC544\uC774\uB514\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694." })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ style: { marginTop: '26px' }, className: "inputTitle" }, { children: "\uBE44\uBC00\uBC88\uD638" })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "inputWrap" }, { children: (0, jsx_runtime_1.jsx)("input", { className: "input", type: "password", placeholder: "\uC601\uBB38, \uC22B\uC790, \uD2B9\uC218\uBB38\uC790 \uD3EC\uD568 8\uC790 \uC774\uC0C1", value: pw, onChange: handlePw }) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "errorMessageWrap" }, { children: !pwValid && pw.length > 0 && ((0, jsx_runtime_1.jsx)("div", { children: "\uC601\uBB38, \uC22B\uC790, \uD2B9\uC218\uBB38\uC790 \uD3EC\uD568 8\uC790 \uC774\uC0C1 \uC785\uB825\uD574\uC8FC\uC138\uC694." })) }))] })), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: onClickConfirmButton, disabled: notAllow, className: "bottomButton" }, { children: "\uD655\uC778" })) })] })));
}
exports.default = Login;
