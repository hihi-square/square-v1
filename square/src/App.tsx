import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, Routes, Route } from "react-router-dom";
import "./App.css";
import Seller from "./routes/seller/Seller";
import Main from "./routes/customer/main/mainPage";
import Store from "./routes/customer/store/storePage";
import CustomerSignUp from "routes/customer/signup/CustomerSignup";


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
          <Route path="/" element={<Main />} />
          <Route path="/seller/*" element={<Seller />} />
          <Route path="/storePage/*" element={<Store />} />
          <Route path="/customer/signup" element={<CustomerSignUp />} />
          {/* <Route path="/customer/*" element={<CustomerLogin />} /> */}

        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;