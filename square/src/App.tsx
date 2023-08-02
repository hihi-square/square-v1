import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";
import Seller from "./routes/seller/Seller";

const theme = createTheme({
  typography: {
    fontFamily: "Pretendard, sans-serif", // 원하는 폰트를 지정합니다.
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Seller></Seller>
      </ThemeProvider>
    </div>
  );
}

export default App;
