import React, { useState, useEffect } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";
import { Unstable_Grid2 as Grid } from "@mui/material";
import { green } from "@mui/material/colors";
import "./App.css";
import Logo from "./Logo";
import SellerRouter from "./routes/seller/SellerRouter";
import Customer from "./routes/customer/Customer";
import CustomerLogin from "./routes/customer/login/Login";
import CustomerSignUp from "./routes/customer/login/CustomerSignup";
import KakaoRedirect from "./routes/customer/login/KakaoRedirect";
import NaverRedirect from "./routes/customer/login/NaverRedirect";
import GoogleRedirect from "./routes/customer/login/GoogleRedirect";
import Error from "./routes/error/Error";
import File from "./routes/test/File";

const theme = createTheme({
  typography: {
    fontFamily: "Pretendard, sans-serif",
  },
  components: {
    MuiIcon: {
      styleOverrides: {
        root: {
          color: "white", // or any color you want for the icons
        },
      },
    },
  },
  palette: {
    primary: {
      main: green[900],
    },
    secondary: {
      main: "#c89e6f",
      dark: "#f0e7d6",
      light: "#603f2e",
    },
  },
});

function App() {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 1000);

    return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 제거
  }, []);

  return (
    <Grid
      container
      className="App"
      sx={{ width: "100vw", height: "100vh", justifyContent: "center" }}
    >
      <ThemeProvider theme={theme}>
        {showLogo ? (
          <Logo />
        ) : (
          <Routes>
            <Route path="*" element={<Customer />} />
            <Route path="/seller/*" element={<SellerRouter />} />
            <Route path="/error/*" element={<Error />} />

            <Route path="/login/" element={<CustomerLogin />} />
            <Route path="/signup" element={<CustomerSignUp />} />
            <Route path="/login/KakaoRedirect" element={<KakaoRedirect />} />
            <Route path="/login/GoogleRedirect" element={<GoogleRedirect />} />
            <Route path="/login/NaverRedirect" element={<NaverRedirect />} />

            <Route path="/test/file" element={<File />} />
          </Routes>
        )}
      </ThemeProvider>
    </Grid>
  );
}

export default App;
