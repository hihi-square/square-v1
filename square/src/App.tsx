import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";
import { Unstable_Grid2 as Grid } from "@mui/material";
import { green } from "@mui/material/colors";
import "./App.css";
import Seller from "./routes/seller/Seller";
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
  return (
    <Grid container className="App" sx={{ width: "100%", height: "100vh" }}>
      <ThemeProvider theme={theme}>
        <Grid
          container
          justifyContent="center"
          xs={12}
          sx={{ width: "100%", height: "100vh" }}
        >
          <Routes>
            <Route path="/*" element={<Customer />} />
            <Route path="/login" element={<CustomerLogin />} />
            <Route path="/signup" element={<CustomerSignUp />} />
            <Route path="/login/KakaoRedirect" element={<KakaoRedirect />} />
            <Route path="/login/GoogleRedirect" element={<GoogleRedirect />} />
            <Route path="/login/NaverRedirect" element={<NaverRedirect />} />
            <Route path="/seller/*" element={<Seller />} />
            <Route path="/error/*" element={<Error />} />
            <Route path="/test/file" element={<File />} />
          </Routes>
        </Grid>
      </ThemeProvider>
    </Grid>
  );
}

export default App;
