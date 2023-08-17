import * as React from "react";
import {
  AppBar,
  Toolbar,
  Unstable_Grid2 as Grid,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
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
  const user = localStorage.getItem("userInfo");

  return (
    <ThemeProvider theme={theme}>
      <Grid xs={12}>
        <AppBar
          position="sticky"
          color="appbar"
          sx={{ top: 0, height: "70px" }}
        >
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
      </Grid>
    </ThemeProvider>
  );
}
