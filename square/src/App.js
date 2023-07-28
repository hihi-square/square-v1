import { createTheme, ThemeProvider} from "@mui/material/styles";
import "./App.css";
import Main from "./routes/Seller.js";

const theme = createTheme({
  typography: {
    fontFamily: "Pretendard, sans-serif", // 원하는 폰트를 지정합니다.
  },
});

function App() {
	return (
		<div className="App">
			<ThemeProvider theme={theme}>
				<Main></Main>
			</ThemeProvider>
		</div>);
}

export default App;
