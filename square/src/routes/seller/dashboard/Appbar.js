import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  status: {
    danger: "#e53e3e",
  },
  palette: {
    primary: {
      main: "#0971f1",
      darker: "#053e85",
    },
    appbar: {
      main: "#1E3129",
      contrastText: "#fff",
    },
  },
});

export default function Appbar() {
  const navigate = useNavigate();
  const user = "ssafy";

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="appbar">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, textAlign: "left", fontWeight: 700 }}
              onClick={() => {
                navigate("/");
              }}
            >
              <Typography
                variant="h5"
                component="span"
                sx={{ color: "#E58900", fontWeight: 700 }}
              >
                S
              </Typography>
              QUARE
            </Typography>
            <Button color="inherit">{user}님, 환영합니다.</Button>
          </Toolbar>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}
