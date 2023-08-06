import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Seller from "./routes/seller/Seller";
import Customer from "./routes/customer/customer";

const theme = createTheme({
  typography: {
    fontFamily: "Pretendard, sans-serif",
  },
  components: {
    MuiIcon: {
      styleOverrides: {
        root: {
          color: 'white', // or any color you want for the icons
        },
      },
    },
  },
});


function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/*" element={<Customer />} />
          <Route path="/seller/*" element={<Seller />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
