import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { REST_API } from "redux/redux";
import {
  Unstable_Grid2 as Grid,
  Typography,
  TextField,
  Box,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
  Button,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

type Form = {
  uid: string;
  password: string;
  nickname: string;
  name: string;
  phone: string;
  email: string;
  marketingAgree: boolean;
};

export default function CustomerSignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState<Form>({
    uid: "",
    password: "",
    nickname: "",
    name: "",
    phone: "",
    email: "",
    marketingAgree: false,
  });

  const [checkPw, setCheckPw] = useState<string>("");
  const [errors, setErrors] = useState({
    uid: "",
    duple: "",
    password: "",
    same: "",
    nickname: "",
    name: "",
    email: "",
    phone: "",
  });
  const [marketing, setMarketing] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [open, setOpen] = useState<string>("");

  // axios 목록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  // 서버에 ID를 보내 중복확인을 실시합니다.
  const handleCheckId = () => {
    axios
      .get(`${REST_API}user/id/${form.uid}`)
      .then((response) => {
        // 서버 응답 처리
        if (response.data.message === "VALID") {
          setErrors((err) => ({ ...err, duple: "" }));
          setChecked(true);
        } else {
          setErrors((err) => ({
            ...err,
            duple: "이미 존재하는 아이디입니다.",
          }));
        }
      })
      .catch((error) => {
        setErrors((err) => ({
          ...err,
          duple: "서버 오류입니다.",
        }));
      });
  };

  const handleSignUp = () => {
    axios
      .post(`${REST_API}user`, form)
      .then((response) => {
        if (response.status === 201) {
          setOpen("성공");
        }
      })
      .catch((error) => {
        setOpen("실패");
      });
  };

  // axios 목록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ
  // 함수 목록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  // ID로 들어올 문자열값을 체크합니다.
  const handleId = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm((prev) => ({ ...prev, uid: e.target.value }));
    setErrors((err) => ({
      ...err,
      duple: "아이디 중복 검사를 진행해주세요.",
    }));

    const regex = /^[a-zA-Z0-9]{6,20}$/;

    if (regex.test(e.target.value)) setErrors((err) => ({ ...err, uid: "" }));
    else
      setErrors((err) => ({
        ...err,
        uid: "아이디는 영문과 숫자를 조합한 6~20자여야 합니다.",
      }));
  };

  // ID의 오류값 텍스트를 반환합니다.
  const idValidation = (): string => {
    if (errors.uid) {
      return errors.uid;
    } else if (errors.duple) {
      return errors.duple;
    } else return "";
  };

  // 비밀번호로 들어올 문자열값을 체크합니다.
  const handlePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, password: e.target.value }));

    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;

    if (regex.test(e.target.value))
      setErrors((err) => ({ ...err, password: "" }));
    else
      setErrors((err) => ({
        ...err,
        password:
          "비밀번호는 영문과 숫자, 특수문자를 최소 1개씩 조합한 8~20자여야 합니다.",
      }));
  };

  // 비밀번호와 비밀번호 확인이 같은지 체크합니다.
  const handleCheckPw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckPw(e.target.value);
    if (e.target.value !== form.password) {
      setErrors((err) => ({
        ...err,
        same: "비밀번호가 같지 않습니다.",
      }));
    } else {
      setErrors((err) => ({
        ...err,
        same: "",
      }));
    }
  };

  // 닉네임이 두글자 이상인지 체크합니다.
  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, nickname: e.target.value }));
    if (e.target.value.length >= 2) {
      setErrors((err) => ({ ...err, nickname: "" }));
    } else {
      setErrors((err) => ({
        ...err,
        nickname: "닉네임은 최소 두글자 이상이어야 합니다.",
      }));
    }
  };

  // 이름이 두글자 이상인지 체크합니다.
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, name: e.target.value }));
    if (e.target.value.length >= 2) {
      setErrors((err) => ({ ...err, name: "" }));
    } else {
      setErrors((err) => ({
        ...err,
        name: "이름은 최소 두글자 이상이어야 합니다.",
      }));
    }
  };

  // 이메일 주소가 존재하는지 체크합니다.
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, email: e.target.value }));

    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (regex.test(e.target.value)) setErrors((err) => ({ ...err, email: "" }));
    else
      setErrors((err) => ({
        ...err,
        email: "올바른 형식의 이메일을 사용해주세요.",
      }));
  };

  // 핸드폰 번호가 존재하는지 체크합니다.
  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, phone: e.target.value }));

    const regex = /^0\d{9,10}$/;

    if (regex.test(e.target.value)) setErrors((err) => ({ ...err, phone: "" }));
    else
      setErrors((err) => ({
        ...err,
        phone: "올바른 형식의 연락처를 사용해주세요.",
      }));
  };

  // 다이얼로그가 꺼질때를 나타냅니다.
  const handleClose = () => {
    if (open === "성공") navigate("/login");
    else {
      setOpen("");
    }
  };

  // 에러가 있는지 확인합니다.
  const isFormValid = () =>
    !Object.values(errors).some((error) => error !== "");

  // 함수 목록 ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ

  return (
    <Grid
      container
      xs={12}
      justifyContent="center"
      sx={{
        maxWidth: "600px",
        height: "100%",
        backgroundImage: "url(/img/MobileBG.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Grid
        container
        xs={12}
        justifyContent="center"
        sx={{ marginTop: "30px" }}
      >
        <Grid
          container
          xs={11}
          sx={{ alignItems: "center", marginBottom: "20px" }}
        >
          <Grid xs={3} sx={{ display: "flex", justifyContent: "end" }}>
            <img
              src="/img/Square.png"
              style={{ width: "70px", height: "auto" }}
              alt="SQUARE 로고"
            />
          </Grid>
          <Grid xs={9}>
            <Typography
              variant="h4"
              component="h4"
              sx={{ fontWeight: 800, textAlign: "center", marginRight: "30px" }}
            >
              <Box component="span" sx={{ color: "primary.main" }}>
                W
              </Box>
              elcome !!
            </Typography>
          </Grid>
        </Grid>
        <Grid container xs={10}>
          <Grid
            container
            xs={12}
            sx={{ backgroundColor: "white", marginBottom: "20px" }}
          >
            <Grid xs={12}>
              <Typography variant="body2" sx={{ fontWeight: 500 }} gutterBottom>
                아이디
              </Typography>
              <FormControl fullWidth>
                <OutlinedInput
                  placeholder="회원 아이디"
                  fullWidth
                  value={form.uid}
                  onChange={handleId}
                  error={Boolean(errors.uid) || Boolean(errors.duple)}
                  autoComplete="userid"
                  startAdornment={
                    checked &&
                    !errors.uid &&
                    !errors.duple && (
                      <InputAdornment position="start">
                        <FontAwesomeIcon
                          icon={faCheck}
                          style={{ color: "green" }}
                        />
                      </InputAdornment>
                    )
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <Button
                        onClick={handleCheckId}
                        disabled={Boolean(errors.uid)}
                        sx={{ color: "grey" }}
                      >
                        중복확인
                      </Button>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <FormHelperText sx={{ color: "#d32f2f", marginLeft: "15px" }}>
                {idValidation()}
              </FormHelperText>
            </Grid>
          </Grid>
          <Grid xs={12} sx={{ backgroundColor: "white", marginBottom: "40px" }}>
            <Typography variant="body2" sx={{ fontWeight: 500 }} gutterBottom>
              비밀번호
            </Typography>
            <TextField
              type="password"
              placeholder="비밀번호"
              fullWidth
              autoComplete="password"
              value={form.password}
              onChange={handlePw}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
          </Grid>
          <Grid xs={12} sx={{ backgroundColor: "white", marginBottom: "40px" }}>
            <Typography variant="body1" sx={{ fontWeight: 500 }} gutterBottom>
              비밀번호 확인
            </Typography>
            <TextField
              type="password"
              placeholder="비밀번호 재입력"
              fullWidth
              autoComplete="password"
              value={checkPw}
              onChange={handleCheckPw}
              error={Boolean(errors.same)}
              helperText={errors.same}
            />
          </Grid>
          <Grid xs={12} sx={{ backgroundColor: "white", marginBottom: "20px" }}>
            <Typography variant="body1" sx={{ fontWeight: 500 }} gutterBottom>
              닉네임
            </Typography>
            <TextField
              placeholder="닉네임"
              fullWidth
              value={form.nickname}
              onChange={handleNickname}
              error={Boolean(errors.nickname)}
              autoComplete="usernick"
              helperText={errors.nickname}
            />
          </Grid>
          <Grid xs={12} sx={{ backgroundColor: "white", marginBottom: "20px" }}>
            <Typography variant="body1" sx={{ fontWeight: 500 }} gutterBottom>
              이름
            </Typography>
            <TextField
              placeholder="이름"
              fullWidth
              value={form.name}
              onChange={handleName}
              error={Boolean(errors.name)}
              autoComplete="username"
              helperText={errors.name}
            />
          </Grid>

          <Grid xs={12} sx={{ backgroundColor: "white", marginBottom: "20px" }}>
            <Typography variant="body1" sx={{ fontWeight: 500 }} gutterBottom>
              이메일
            </Typography>
            <TextField
              placeholder="square.example.com"
              fullWidth
              type="email"
              value={form.email}
              onChange={handleEmail}
              error={Boolean(errors.email)}
              autoComplete="email"
              helperText={errors.email}
            />
          </Grid>
          <Grid xs={12} sx={{ backgroundColor: "white", marginBottom: "20px" }}>
            <Typography variant="body1" sx={{ fontWeight: 500 }} gutterBottom>
              핸드폰번호
            </Typography>
            <TextField
              placeholder="-를 뺀 숫자를 나열"
              fullWidth
              type="tel"
              value={form.phone}
              onChange={handlePhone}
              error={Boolean(errors.phone)}
              autoComplete="tel"
              helperText={errors.phone}
            />
          </Grid>

          <Grid xs={12} sx={{ backgroundColor: "white", marginBottom: "20px" }}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={() => {
                    setMarketing(!marketing);
                  }}
                />
              }
              label="마케팅 수신에 동의합니다."
            />
            <FormHelperText sx={{ color: "#d32f2f", marginLeft: "15px" }}>
              {!marketing && "마케팅 수신에 동의해야 가입할 수 있습니다."}
            </FormHelperText>
          </Grid>

          <Grid container xs={12} justifyContent="center">
            <Grid xs={12}>
              <Button
                onClick={handleSignUp}
                disabled={!isFormValid() || !marketing}
                variant="contained"
                color="primary"
                sx={{ height: "60px", marginBottom: "10px" }}
                fullWidth
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 500, textAlign: "center" }}
                >
                  가입하기
                </Typography>
              </Button>
            </Grid>
            <Button
              onClick={() => {
                navigate("/login");
              }}
              variant="contained"
              color="secondary"
              sx={{ height: "60px" }}
              fullWidth
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 500, textAlign: "center" }}
              >
                뒤로가기
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Dialog open={Boolean(open)} onClose={handleClose}>
        <DialogTitle>
          {open === "성공"
            ? `${form.nickname}님, 가입을 축하드립니다 !`
            : "가입에 실패했습니다."}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {open === "성공"
              ? "Square에서 우리 동네의 여러가지 물품들을 구매해보세요! 프로필 사진을 등록하고, 커뮤니티에서 활동할 수도 있습니다 !"
              : "알 수 없는 오류로 인해 가입에 실패하였습니다."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>확인</Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
