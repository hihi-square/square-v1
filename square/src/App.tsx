import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";
import { Unstable_Grid2 as Grid } from "@mui/material";
import { green } from "@mui/material/colors";
import "./App.css";
import Seller from "./routes/seller/Seller";
import Customer from "./routes/customer/Customer";
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
    <Grid container className="App" sx={{ width: "100%", height: "auto" }}>
      <ThemeProvider theme={theme}>
        <Grid
          container
          justifyContent="center"
          xs={12}
          sx={{ width: "100%", height: "100vh" }}
        >
          <Routes>
            <Route path="/*" element={<Customer />} />
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
