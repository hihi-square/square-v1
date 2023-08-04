import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, Routes, Route } from "react-router-dom";
import "./App.css";
import Seller from "./routes/seller/Seller";
import Customer from "./routes/customer/customer";

// import CustomerSignUp from "routes/customer/signup/CustomerSignup";
// import CustomerLogin from "routes/customer/login/CustomerLogin";

const theme = createTheme({
  typography: {
    fontFamily: "Pretendard, sans-serif", // 원하는 폰트를 지정합니다.
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Link to="/">구매자 페이지로</Link>
        <Link to="/seller">판매자 페이지로</Link>
        <Routes>
          <Route path="/*" element={<Customer />} />
          <Route path="/seller/*" element={<Seller />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
