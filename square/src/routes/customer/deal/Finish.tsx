import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

export default function Finish() {
  const navigate = useNavigate(); // 네비게이션 함수 사용

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{ fontSize: "2rem", padding: "15px 70px" }} // 폰트 크기와 패딩 조절로 버튼 크기 증가
        onClick={() => navigate("/")}
      >
        결제 완료
      </Button>
      <h4>버튼을 누르면 다음 화면으로 넘어갑니다.</h4>
    </Box>
  );
}
