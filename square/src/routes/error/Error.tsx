import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/main");
    }, 3000);
  }, []);

  return <div> 에러 페이지입니다. 5초 뒤에 메인 화면으로 돌아갑니다.</div>;
}
